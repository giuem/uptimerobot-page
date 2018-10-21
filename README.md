# UptimeRobot Page

> Another status page based on [UptimeRobot](https://uptimerobot.com/)

[![Travis](https://img.shields.io/travis/giuem/uptimerobot-page.svg?style=flat-square)](https://travis-ci.org/giuem/uptimerobot-page)
[![Docker Build Status](https://img.shields.io/docker/build/giuem/uptimerobot-page.svg?style=flat-square)](https://hub.docker.com/r/giuem/uptimerobot-page/)
[![Codecov](https://img.shields.io/codecov/c/github/giuem/uptimerobot-page.svg?style=flat-square)](https://codecov.io/gh/giuem/uptimerobot-page)
[![GitHub package version](https://img.shields.io/github/package-json/v/giuem/uptimerobot-page.svg?style=flat-square)](https://github.com/giuem/uptimerobot-page/blob/master/package.json)
[![license](https://img.shields.io/github/license/giuem/uptimerobot-page.svg?style=flat-square)](https://github.com/giuem/uptimerobot-page/blob/master/LICENSE)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square)](https://renovateapp.com/)


## Requirements

* Node.js >= 8
* Uptime Robot API key
* Docker and docker-compose (optional)

## todolist

* document

## Getting Started

todo...

## Parser Usage
  We use the parser to analyze groups name, monitors name and group index (optional) which included in your original monitor's name.  
Default Parser is `$group/$name`, there are 3 variables now: 
  
  - $group
  - $name
  - $index 
  
  You can change the backslash / to any separator you like, as long as it won't used in your group & monitor name (and index).  
To put index into your parser, you will able to sort your group in page manually. Easily write index for each group once (also for all if you like), and leave the blank of the index for other monitors in the same group.
  
> There is example:
> **Group Name**/**Index**/**Monitor Name**
> ```
> $group/$index/$name
> ```
> For this format, you should write index in original name at Uptimerobots Control Panel for each group once:
> ```
> GroupA/1/MonitorA
> ```
> And leave the blank of the index for other monitors in the same group.
> ```
> GroupA//MonitorB
> ```

