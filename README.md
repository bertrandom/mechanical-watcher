# mechanical-watcher

Simple script to check for new DSA or SA keycaps on [/r/mechmarket](https://www.reddit.com/r/mechmarket) and to look for SA "1976" keycap releases on [PMK](http://pimpmykeyboard.com/sa-1976-keycap-set/).

If found, it will post to a Slack channel via an incoming webhook.

Intended to be run as a cronjob, e.g.
```
*/5 * * * * cd /var/www/mechanical-watcher && node index > /dev/null 2>&1
```
