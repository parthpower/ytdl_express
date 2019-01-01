# YT Download REST API

## Installation (Docker)

```
git clone https://github.com/parthpower/ytdl_express
cd ytdl_express
docker build -t <username>/ytdl_express .
docker run -p 8080:8080 -d <username>/ytdl_express
```

## Usage

### GET Request

`<endpoint>/?url=<youtube_video_url>` to download audio only (aac format)

`<endpoint>/vid?url=<youtube_video_url>` to download video.

`<endpoint>/search?q=<search_query>` to get search result using the [parthpower/youtube-scrape](https://github.com/parthpower/youtube-scrape) scraper.

`<endpoint>/iamfeelinglucky?q=<search_query>[&vid=1]` to get audio/video file from first search result.

## DISCLAIMER

THIS PROJECT IS FOR EDUCATIONAL PURPOSE ONLY.

## [LICENSE](/LICENSE)
