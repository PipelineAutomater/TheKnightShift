The Knight Shift
Will give automated, human-like chess feedback (currently only has a chess board feature and play-against-computer component)

Online Version (chess board only):
https://pipelineautomater.github.io/TheKnightShift/

Local Version (chess board and computer mode):
1. Download files from https://github.com/PipelineAutomater/TheKnightShift.git
2. Make sure you have Node Package Manager (npm) installed with Node 20. Run the command:
npm install --force
3. Run the command:
npm start
This will give a link to localhost://4000. Click on that link or paste it from here into the browser.

Technical Stuff:
Used Angular to make a completely front-end system as I work on studying the separation between backend and frontend. Uses Stockfish API for computer mode.

Features:
Normal chessboard with different visual and audio cues for differnt move types. Can play against anothe rplayer on the same computer using this feature.

Computer mode to play against Stockfish, which can be set to different strengths.

Credits:
1. https://www.youtube.com/watch?v=fJIsqZmQVZQ
Had to adapt to newer versions of Angular because it was outdated. Also learned not to test at the end and to test incrementally, because it took me a long time to debug.
2. Angular