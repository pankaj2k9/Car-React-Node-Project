# Data downloader

Steps:
- Compile new binary
- Create new docker image and upload to docker registry

## Compiling
Note: probably must put main.go in a proper `GOPATH`: 

```
mkdir -p ~/gowork/{pkg,src,bin} 
export GOPATH=~/gowork
mkdir -p ~/gowork/src/github.com/<username>/uproxx-rav4
mv main.go ~/gowork/src/github.com/<username>/uproxx-rav4/main.go
cd ~/gowork/src/github.com/<username>/uproxx-rav4
(compile commands)
```

### from MacOS
```
go build main.go
GOOS=linux go build main.go
```
Then move binaries to correct location.

### from Linux
```
go build main.go
GOOS=darwin go build main.go
```

## Docker

```
docker login d.wdb.st
./build.sh
```