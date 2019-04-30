/**
 * @license
 * Copyright Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START sheets_quickstart]
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/sheets/v4"
)

type JsonData struct {
	Visibility		string `json:"Visibility" default:""`
	SectionType		string `json:"Section Type" default:""`
	Headline		string `json:"Headline" default:""`
	Description		string `json:"Description" default:""`
	PhotoURL		string `json:"Photo URL" default:""`
	VideoEmbed		string `json:"Video Embed" default:""`
	BGType			string `json:"BG Type" default:""`
	BGURL			string `json:"BG URL" default:""`
	CTAURL			string `json:"CTA URL" default:""`
	Tagline			string `json:"Tagline" default:""`
	CityState		string `json:"City, State" default:""`
	LatStart		string `json:"Lat. Start" default:""`
	LonStart		string `json:"Lon. Start" default:""`
	LatEnd			string `json:"Lat. End" default:""`
	LonEnd			string `json:"Lon. End" default:""`
	Temp			string `json:"Temp. (°F)" default:""`
	Weather			string `json:"Weather" default:""`
	MilesTraveled 	string `json:"Miles Traveled" default:""`
}

// Retrieve a token, saves the token, then returns the generated client.
func getClient(config *oauth2.Config) *http.Client {
	// The file token.json stores the user's access and refresh tokens, and is
	// created automatically when the authorization flow completes for the first
	// time.
	tokFile := "token.json"
	tok, err := tokenFromFile(tokFile)
	if err != nil {
		tok = getTokenFromWeb(config)
		saveToken(tokFile, tok)
	}
	return config.Client(context.Background(), tok)
}

// Request a token from the web, then returns the retrieved token.
func getTokenFromWeb(config *oauth2.Config) *oauth2.Token {
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("Go to the following link in your browser then type the "+
		"authorization code: \n%v\n", authURL)

	var authCode string
	if _, err := fmt.Scan(&authCode); err != nil {
		log.Fatalf("Unable to read authorization code: %v", err)
	}

	tok, err := config.Exchange(context.TODO(), authCode)
	if err != nil {
		log.Fatalf("Unable to retrieve token from web: %v", err)
	}
	return tok
}

// Retrieves a token from a local file.
func tokenFromFile(file string) (*oauth2.Token, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	tok := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(tok)
	return tok, err
}

// Saves a token to a file path.
func saveToken(path string, token *oauth2.Token) {
	fmt.Printf("Saving credential file to: %s\n", path)
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Fatalf("Unable to cache oauth token: %v", err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)
}

func main() {
	b, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
	}

	// If modifying these scopes, delete your previously saved token.json.
	config, err := google.ConfigFromJSON(b, "https://www.googleapis.com/auth/spreadsheets.readonly")
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
	}
	client := getClient(config)

	srv, err := sheets.New(client)
	if err != nil {
		log.Fatalf("Unable to retrieve Sheets client: %v", err)
	}

	// writing data.json
	f, err := os.OpenFile("data.json", os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
		if err != nil {
			log.Fatalf("Unable to cache oauth token: %v", err)
		}
	defer f.Close()

	// Prints the names and majors of students in a sample spreadsheet:
	// https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
	spreadsheetId := "1vXwIz89L7N7-R2EnqbcaFjFHE1W0HvS1vwv3oBGMzKk"
	readRange := [5]string{"California!A2:V", "Northwest!A2:V", "'Gulf States'!A2:V", "Midwest!A2:V", "'East Coast'!A2:V"}
	fmt.Printf("Saving data file to: %s\n", "data.json")
	f.WriteString("{")
	for sheet, _ := range readRange {
		dataRow := strings.Split(readRange[sheet], "!")
		result := strings.Replace(dataRow[0], "'", "", -1)
		s := fmt.Sprintf("\"%s\": [", result)
		f.WriteString(s)
		resp, err := srv.Spreadsheets.Values.Get(spreadsheetId, readRange[sheet]).Do()
		if err != nil {
			log.Fatalf("Unable to retrieve data from sheet: %v", err)
		}
		if len(resp.Values) == 0 {
			fmt.Println("No data found.")
		} else {
			for i, row := range resp.Values {
				if (i != 0) {
				f.WriteString(",")
				}
				json.NewEncoder(f).Encode(row)
			}
		}
		f.WriteString("]")
		if (sheet != 4) {
		f.WriteString(",")
		}
	}
	f.WriteString("}")
}