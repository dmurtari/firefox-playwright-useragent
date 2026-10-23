* `index.mjs` contains a script that runs a few different requests, while telling playwright to return a custom user-agent.
* `repro.sh` runs this script in Docker with Playwright 1.62.1 and 1.63.0, to show the different results

```
> ./repro.sh

Running tests with Playwright v1.62.1
chromium 151.0.7922.34
plain request:    my-custom-user-agent
route.continue(): my-custom-user-agent
route.fetch():    my-custom-user-agent
request.headers():my-custom-user-agent
firefox 153.0
plain request:    my-custom-user-agent
route.continue(): my-custom-user-agent
route.fetch():    my-custom-user-agent
request.headers():my-custom-user-agent
webkit 26.5
plain request:    my-custom-user-agent
route.continue(): my-custom-user-agent
route.fetch():    my-custom-user-agent
request.headers():my-custom-user-agent

Running tests with Playwright v1.63.0
chromium 153.0.8010.12
plain request:    my-custom-user-agent
route.continue(): my-custom-user-agent
route.fetch():    my-custom-user-agent
request.headers():my-custom-user-agent
firefox 155.0
plain request:    my-custom-user-agent
route.continue(): my-custom-user-agent
route.fetch():    Mozilla/5.0 (X11; Linux x86_64; rv:155.0) Gecko/20100101 Firefox/155.0
request.headers():Mozilla/5.0 (X11; Linux x86_64; rv:155.0) Gecko/20100101 Firefox/155.0
webkit 26.6
plain request:    my-custom-user-agent
route.continue(): my-custom-user-agent
route.fetch():    my-custom-user-agent
request.headers():my-custom-user-agent
```
