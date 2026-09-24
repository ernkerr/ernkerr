// The lineup. Every wave in the rotation.
//   frame: false  → site refuses to load inside an iframe, so show a postcard instead
window.SITES = [
  // ── toys ────────────────────────────────────────────────
  { url: "https://pointerpointer.com/", title: "Pointer Pointer", blurb: "Hold still. Someone, somewhere, is pointing at your cursor.", tags: ["toys", "weird"] },
  { url: "https://www.koalastothemax.com/", title: "Koalas to the Max", blurb: "Mouse over the circles. Keep going. Trust us.", tags: ["toys"] },
  { url: "https://cat-bounce.com/", title: "Cat Bounce", blurb: "Cats. Bouncing. You can throw them.", tags: ["toys", "weird"] },
  { url: "https://paveldogreat.github.io/WebGL-Fluid-Simulation/", title: "Fluid Simulation", blurb: "Drag through neon ink and watch it swirl.", tags: ["toys", "art"] },
  { url: "https://akirodic.com/p/jellyfish/", title: "Jellyfish", blurb: "A drifting WebGL jellyfish tank, deep in the web.", tags: ["chill", "art"] },
  { url: "https://www.staggeringbeauty.com/", title: "Staggering Beauty", blurb: "Wiggle the worm. Then shake it. (Flashing lights!)", tags: ["toys", "weird"] },
  { url: "https://puginarug.com/", title: "Pug in a Rug", blurb: "Exactly what it says on the rug.", tags: ["weird", "chill"] },
  { url: "https://eelslap.com/", title: "Eel Slap", blurb: "Slap a man with an eel, frame by frame.", tags: ["toys", "weird"] },
  { url: "https://bongo.cat/", title: "Bongo Cat", blurb: "Play the bongos (and more) with your keyboard.", tags: ["toys", "music"] },
  { url: "https://optical.toys/", title: "Optical Toys", blurb: "A shelf of tiny interactive illusions.", tags: ["toys", "art"] },
  { url: "https://checkbox.toys/", title: "Checkbox Toys", blurb: "Games and art built entirely out of checkboxes.", tags: ["toys", "games"] },
  { url: "https://paint.toys/", title: "Paint Toys", blurb: "Weird little brushes that paint by themselves.", tags: ["toys", "art"] },
  { url: "https://ffffidget.com/", title: "ffffidget", blurb: "Tactile browser fidget toys for restless hands.", tags: ["toys", "chill"] },
  { url: "https://hackertyper.net/", title: "Hacker Typer", blurb: "Mash your keyboard. Look like you're hacking the mainframe.", tags: ["toys", "weird"] },

  // ── games ───────────────────────────────────────────────
  { url: "https://checkboxolympics.com/", title: "Checkbox Olympics", blurb: "Compete in events you never knew checkboxes could host.", tags: ["games"] },
  { url: "https://www.onesquareminesweeper.com/", title: "One Square Minesweeper", blurb: "The purest form of minesweeper. Good luck.", tags: ["games", "weird"] },
  { url: "https://longdogechallenge.com/", title: "Long Doge Challenge", blurb: "How long is this doge? Only one way to find out.", tags: ["games", "weird"] },
  { url: "https://www.windows93.net/", title: "Windows 93", blurb: "The operating system that never was. Click everything.", tags: ["games", "weird"] },
  { url: "https://sandspiel.club/", title: "Sandspiel", blurb: "A falling-sand sandbox — water, fire, plants, lava.", tags: ["games", "toys"] },
  { url: "https://orb.farm/", title: "Orb Farm", blurb: "Build a tiny self-sustaining aquatic ecosystem.", tags: ["games", "science", "chill"] },
  { url: "https://neal.fun/password-game/", title: "The Password Game", blurb: "Please choose a password. It must contain… a lot.", tags: ["games"], frame: false },
  { url: "https://neal.fun/infinite-craft/", title: "Infinite Craft", blurb: "Combine water and fire. Then keep going forever.", tags: ["games"], frame: false },

  // ── chill ───────────────────────────────────────────────
  { url: "https://asoftmurmur.com/", title: "A Soft Murmur", blurb: "Mix rain, waves, and thunder into your own ambient noise.", tags: ["chill", "music"] },
  { url: "https://pixelthoughts.co/", title: "Pixel Thoughts", blurb: "A 60-second meditation. Put your stress in a star.", tags: ["chill"] },
  { url: "https://www.window-swap.com/", title: "WindowSwap", blurb: "Look out of someone else's window, somewhere in the world.", tags: ["chill", "travel"], frame: false },
  { url: "https://radio.garden/", title: "Radio Garden", blurb: "Spin the globe and tune into live radio anywhere.", tags: ["chill", "music", "travel"], frame: false },
  { url: "https://thisissand.com/", title: "This Is Sand", blurb: "Pour digital sand into slow, layered landscapes.", tags: ["chill", "art"] },
  { url: "https://weavesilk.com/", title: "Silk", blurb: "Draw symmetric, glowing silk with a flick of the mouse.", tags: ["chill", "art"] },
  { url: "https://zoomquilt.org/", title: "The Zoomquilt", blurb: "An endlessly zooming painting. Keep falling in.", tags: ["chill", "art"] },
  { url: "https://mondrianandme.com/", title: "Mondrian and Me", blurb: "Make your own Mondrian, one click at a time.", tags: ["art", "chill"] },

  // ── science & learning ──────────────────────────────────
  { url: "https://ncase.me/trust/", title: "The Evolution of Trust", blurb: "An interactive guide to game theory and why we trust.", tags: ["science"] },
  { url: "https://ncase.me/polygons/", title: "Parable of the Polygons", blurb: "A playable post on how small biases shape a world.", tags: ["science"] },
  { url: "https://htwins.net/scale2/", title: "Scale of the Universe", blurb: "Zoom from quantum foam to the whole observable universe.", tags: ["science"] },
  { url: "https://earth.nullschool.net/", title: "Earth", blurb: "Global winds, ocean currents, and waves — live.", tags: ["science", "travel", "chill"] },
  { url: "https://neal.fun/deep-sea/", title: "The Deep Sea", blurb: "Scroll down. Keep scrolling. The ocean is deep.", tags: ["science"], frame: false },
  { url: "https://neal.fun/space-elevator/", title: "Space Elevator", blurb: "Ride an elevator from the ground to outer space.", tags: ["science"], frame: false },
  { url: "https://www.submarinecablemap.com/", title: "Submarine Cable Map", blurb: "The undersea cables that carry the internet you're surfing.", tags: ["science", "travel"] },
  { url: "https://oimo.io/works/life/", title: "Life Universe", blurb: "Conway's Game of Life, all the way down. Zoom out.", tags: ["science", "art"] },
  { url: "https://mapcrunch.com/", title: "MapCrunch", blurb: "Teleport to a random Street View spot on Earth.", tags: ["travel"] },

  // ── art ─────────────────────────────────────────────────
  { url: "https://jacksonpollock.org/", title: "Jackson Pollock", blurb: "Move your mouse. Become an abstract expressionist.", tags: ["art", "toys"] },
  { url: "https://drawing.garden/", title: "Drawing Garden", blurb: "Plant a garden that grows from your doodles.", tags: ["art", "chill"] },
  { url: "https://floor796.com/", title: "Floor 796", blurb: "A giant, hand-animated sci-fi space station to explore.", tags: ["art"] },
  { url: "https://www.cachemonet.com/", title: "Cache Monet", blurb: "Vaporwave vibes, forever.", tags: ["art", "weird"] },
  { url: "https://www.rrrgggbbb.com/", title: "rrrgggbbb", blurb: "Colors. Just colors, one after the other.", tags: ["art", "chill"] },

  // ── weird old web ───────────────────────────────────────
  { url: "https://endless.horse/", title: "Endless Horse", blurb: "Scroll down. How long are this horse's legs?", tags: ["weird"] },
  { url: "https://heeeeeeeey.com/", title: "Heeeeeeeey", blurb: "Heeeeeeeeeeeeeeeeeeeeeeeeeey.", tags: ["weird", "music"] },
  { url: "https://corndog.io/", title: "Corndog", blurb: "It's raining corndogs.", tags: ["weird"] },
  { url: "https://www.zombo.com/", title: "Zombo.com", blurb: "Welcome. You can do anything at Zombo.com.", tags: ["weird", "music"] },
  { url: "https://www.nooooooooooooooo.com/", title: "Noooooooo", blurb: "For when you need to express yourself.", tags: ["weird"] },
  { url: "https://www.fallingfalling.com/", title: "Falling Falling", blurb: "An infinite hypnotic fall. With a soundtrack.", tags: ["weird", "chill"] },
  { url: "https://www.ducksarethebest.com/", title: "Ducks Are the Best", blurb: "A persuasive essay on ducks.", tags: ["weird"] },
  { url: "https://thatsthefinger.com/", title: "That's the Finger", blurb: "A finger follows you. That's it.", tags: ["weird"] },
  { url: "https://burymewithmymoney.com/", title: "Bury Me With My Money", blurb: "Make it rain.", tags: ["weird"] },
  { url: "https://www.trypap.com/", title: "Pap", blurb: "A paper-shredder-meets-ASMR-ish time sink.", tags: ["weird", "toys"] },
  { url: "https://iamawesome.com/", title: "I Am Awesome", blurb: "A confidence boost, delivered with gusto.", tags: ["weird"] },
  { url: "https://www.spacejam.com/1996/", title: "Space Jam (1996)", blurb: "The original 1996 movie site, preserved like a fossil.", tags: ["weird"] },
  { url: "https://www.lingscars.com/", title: "Ling's Cars", blurb: "A car-leasing site that is also a fever dream.", tags: ["weird"] },
  { url: "https://theuselessweb.com/", title: "The Useless Web", blurb: "A fellow surfer. One button, one useless site.", tags: ["weird"] },
];

window.CATEGORIES = [
  { id: "all", label: "All waves", icon: "🌊" },
  { id: "toys", label: "Toys", icon: "🪀" },
  { id: "games", label: "Games", icon: "🕹️" },
  { id: "chill", label: "Chill", icon: "🌴" },
  { id: "science", label: "Science", icon: "🔭" },
  { id: "art", label: "Art", icon: "🎨" },
  { id: "music", label: "Music", icon: "🎶" },
  { id: "travel", label: "Travel", icon: "🧭" },
  { id: "weird", label: "Weird", icon: "🦑" },
];
