## How much time did you spend on the assignment?
cca 12 hours

## What would you do differently if you had more time?
- use context for better handling of data. Initial data should be fetched when page is rendering and should be saved in context on app level, so that we can avoid fetching t every time tab opens
- maybe using react router for navigation instead of just 'dumb logic'
- when retrying to call rest api i would use a small timeout to give server time to get it together
- better error handling with errorBoundery, better implementation of showing errors to user and also more detail handling of APIs errors based on status (for example retry 408 Request Timeout or 504 Gateway Timeout, but don't bother with 404)

## What part of the assignment did you find the most challenging?
Configuration and writing tests gave me the ost headaches. Also figuring out the visual part of the app. Design is not my strong suit.

## What part of the assignment did you find the least challenging?
writing react components

## Provide any additional information or notes about design decisions, challenges faced, etc.
To be honest this app was a little bit of experiment. When I got it I put it in the chatgpt, and i got it working with tests and everything in less then 2 hours. 
That was a shock because I was expectng to take longer, or that at least stuff will not work. But it did. So after 2 hours I was kind of devestated on the future of our profession. But after that I went and look at the code. So yeah... 
Code that you see now has nothing to do with code chatgpt generated, becasue I throw it away like 80%. Honestly the little part that was left was some of the tailwind classes. Since I didn't just throw the code away at 
the begining it took me longer to rewrite it and find better solutions (the usual :).) So yeah the chat gpt part was the biggest challenge here that I brought on myself.

Apart from that I needed to remember how to write tests. :)

Another part that I was not sure about is whether to use react router for navigation or not. I decided to throw it away and do dumb tab navigation. Maybe I could/should also implement changing of the urls with the whole logic of the back 
button when changing the tabs/pages.

I enjoyed looking for better solutions, and with rewrites I was improving the ideas of application flow and logic. That was fun :).
