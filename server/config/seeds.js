const db = require('./connection');
const { User, Product, Category, Album, Genre } = require('../models');

db.once('open', async () => {
  await Genre.deleteMany();
  const genres = await Genre.insertMany([
    { name: 'Rock' },
    { name: 'Pop' },
    { name: 'Rap' },
    { name: 'Country' },
    { name: 'Jazz' },
    { name: 'Hip Hop'}
  ]);

  await Album.deleteMany();  
  const albums = await Album.insertMany([
    {
      title: 'Highway to Hell',
      description: 'The album became AC/DCs first LP to break the top 100 of the US Billboard 200 chart.',
      label: 'Albert-Atlantic',
      artist: "AC/DC",
      genre: genres[0].id,
      price: 70.00,
      quantity: 4,
      imageFront: 'acdcHighwayToHellFront.jpg',
      imageBack: 'acdcHighWayToHellBack.jpg',
      sideATracks:["Highway to Hell", "Girls Got Rhythm", "Walk All Over You","Touch Too Much","Beating Around the Bush"],
      sideBTracks:["Shot Down in Flames", "Get It Hot", "If You Want Blood (You've Got It)","Love Hungry Man","Night Prowler"]
    },
    {  
      title: 'ADELE21',
      description: 'The album was named after the age of the singer during its production. 21 shares the Motown/soul influences of her 2008 debut album 19, but also draws influence from the American country and Southern blues music that Adele started listening to during the North American leg of her tour An Evening with Adele.',
      label: 'XL-Columbia',
      artist: "ADELE",
      genre: genres[1].id,
      price: 75.00,
      quantity: 2,
      imageFront: 'adele21Front.jpg',
      imageBack: 'adele21Back.jpg',
      sideATracks:["Rolling in the Deep", "Rumour Has It", "Turning Tables","Don't You Remember","Set Fire to the Rain","He Won't Go"],
      sideBTracks:["Take It All", "I'll Be Waiting","One and Only", "Lovesong","Someone like You","I Found a Boy"]
    },
    {
      title: 'Black Holes',
      description: 'Black Holes is the debut studio album by Canadian blues rock band, The Blue Stones.',
      label: 'eOne',
      artist: "The Blue Stones",
      genre: genres[0].id,
      price: 49.99,
      quantity: 5,
      imageFront: 'blueStonesBlackHolesFront.png',
      imageBack: 'blueStonesBlackHolesBack.png',
      sideATracks:["Airlock", "The Drop", "Black Holes (Solid Ground)","The Hard Part","Be My Fire"],
      sideBTracks:["Lay", "Rolling with the Punches","Little Brother", "Midnight","Orbit","Magic"]
    },
    {
      title:"Viva la Vida or Death and All His Friends",
      description:"The song's Spanish title, 'Viva la Vida', is taken from a painting by 20th-century Mexican artist Frida Kahlo. In Spanish, viva is an expression used to acclaim someone or something,[4] so 'Long Live Life' is an accurate translation and the painting reflects the artistic irony of acclaiming life while suffering physically.",
      label:"Parlophone (world)Capitol (North America)",
      artist:"Coldplay",
      genre:genres[1].id,
      price:"70.99",
      quantity:"10",
      imageFront:"coldplayVivaLaVidaFront.jpg",
      imageBack:"coldplayVivaLaVidaBack.jpg",
      sideATracks:["Life In Technicolor", "Cementeries Of London", "Lost!", "42", "Lovers In Japan/Reign Of Love"],
      sideBTracks:["Yes", "Viva La Vida", "Violet Hill", "Stroberry Swing", "Death And All His Friends"]
    },
    {
        title:"Celebration Day",
        description:"The song starts with guitar chords played over a monotonic drone created by a synthesiser. This connects the song musically with the preceding track on the album, 'Friends', which ends with the same drone.",
        label:"Atlantinc",
        artist:"Led Zeppelin",
        genre:genres[0].id,
        price:"29.99",
        quantity:"10",
        imageFront:"ledZeppelinCelebrationDayFront.jpg",
        imageBack:"ledZeppelinCelebrationDayBack.jpg",
        sideATracks:["Good Times Bad Times", "Ramble On", "Black Dog", "In My Time Of Dying", "For Your Life", "Tramblad Underfoot", "Nobody's Fault But Mine", "No Quater"],
        sideBTracks:["Since I've Been Loving You", "Dazed And Confused", "Stairway To Heaven", "The Song Remains The Same", "Misty Mountain Hop","Kashmir", "Whole Lotta Love", "Rock And Roll"]
      },
      {
        title:"The Truth About Love",
        description:"The Truth About Love is the sixth studio album by American singer-songwriter Pink. It was released on September 14, 2012, through RCA Records. After giving birth to her first child in 2011, Pink started working on the album with longtime collaborator Billy Mann. With hopes of becoming more involved in the production of the album, she also reunited with Greg Kurstin and Butch Walker.",
        label:"RCA", 
        artist:"Pink",
        genre:genres[1].id,
        price:"19.99",
        quantity:"6",
        imageFront:"pinkTheTruthAboutLoveFront.png",
        imageBack:"pinkTheTruthAboutLoveBack.jpg",
        sideATracks:["Are We All We Are", "Blow Me (One Last Kiss)", "Try", "Just Give Me a Reason", "True Love", "How Come You're Not Here?"],
        sideBTracks:["Slut Like You", "The Truth About Love", "Beam Me Up", "Walk of Chame", "Here Comes The Weekend"]
      },
      {
        title:"Sudden Opera",
        description:"Pony Bradshaw didn’t know he could sing because he’d never tried. His dad was a military man turned Elvis impersonator whom a young Pony helped keep stocked with scarves on stage for admirers. Pony had always listened to music, but he’d never made it. He played baseball. He joined––and got kicked out of––the Air Force. It was about five years ago when Pony discovered not only that he could make music, but that he should.",
        label:"Rounder",
        artist:"Pony Bradshaw",
        genre:genres[0].id,
        price:"13.98",
        quantity:"12",
        imageFront:"ponyBradshawSuddenOperaFront.jpg",
        imageBack:"ponyBradShawSuddenOperaBack.png",
        sideATracks:["an Gogh","Jehovah","Shame","Ain't No Eden","10x10","Charlatan"],
        sideBTracks:["Didn't It Rain","Loretta","Bad Teeth","Sippi Sand","Gaslight Heart","Josephine"]
      },
      {
        title:"The Game",
        description:"The Game is the eighth studio album by the British rock band Queen. It was released on 30 June 1980 by EMI Records in the UK and by Elektra Records in the US. The Game features a different sound from its predecessor, Jazz (1978). The Game was the first Queen album to use a synthesizer[5] (an Oberheim OB-X).",
        label:"EMI Elektra",
        artist:"Queen",
        genre:genres[0].id,
        price:"29.99",
        quantity:"50",
        imageFront:"queenTheGameFront.png",
        imageBack:"queenTheGameBack.jpeg",
        sideATracks:["Play the Game","Dragon Attack","Another One Bites the Dust","Need Your Loving Tonight","Crazy Little Thing Called Love","Rock It (Prime Jive)","Save Me"],
        sideBTracks:["Save Me (Live in Montreal, November 1981)","Don't Try Suicide","Sail Away Sweet Sister","Coming Soon","A Human Body (B-Side)","Sail Away Sweet Sister (Take 1 with Guide Vocal)","It's a Beautiful Day (Original Spontaneous Idea, April 1980)","Dragon Attack (Live at Milton Keynes Bowl, June 1982)"]
      },
      {
        title:"Hear Me Out",
        description:"Hear Me Out, the long awaited, highly anticipated debut album from Reignwolf, will be unleashed to the world Friday, March 1st. The band best known for it's raw sound and high energy performances have put the finishing touches on this ten track studio monster. With appearances at major music festivals such as Coachella, Lollapalooza, Austin City Limits and Glastonbury and high profile opening slots for some of the most influential bands including Black Sabbath and Pixies, Reignwolf made a name for themselves worldwide without ever releasing a record... until now!",
        label:"Reignwolf",
        artist:"Reign Wolf",
        genre:genres[1].id,
        price:"19.99",
        quantity:"5",
        imageFront:"reignwolfHearMeOutFront.jpg",
        imageBack:"reignwolfHearMeOutBack.jpg",
        sideATracks:["Black and Red","Alligator","Over & Over","Wanna Don't Wanna","Ritual"],
        sideBTracks:["Keeper","Son of a Gun","I Want You","Fools Gold","Wolf River"]
      },
      {
        title:"Kind of Blue",
        name:"Kind of Blue",
        description: "Kind of Blue is a studio album by American jazz trumpeter Miles Davis. It was recorded on March 2 and April 22, 1959, at Columbia's 30th Street Studio in New York City, and released on August 17 of that year by Columbia Records. The album features Davis's ensemble sextet consisting of saxophonists John Coltrane and Julian 'Cannonball' Adderley, pianist Bill Evans, bassist Paul Chambers, and drummer Jimmy Cobb, with new band pianist Wynton Kelly appearing on one track in place of Evans. In part owing to Evans's joining the sextet during 1958, Davis followed up on the modal experimentations of Milestones (1958) by basing Kind of Blue entirely on modality, departing further from his earlier work's hard bop style of jazz.",
        label:"Miles Davis",
        artist:"Miles Davis",
        genre:genres[4].id,
        price:"59.99",
        quantity:"7",
        imageFront:"milesDavisKindofBlueFront.jpg",
        imageBack:"milesDavisKindOfBlueBack.jpg",
        image:"milesDavisKindOfBlueFront.jpg",
        sideATracks:["All Blues","Flamenco Sketches","Freddie Freeloader"],
        sideBTracks:["Blue in Green","So What"]
      },
      {
        title:"The Sidewinder",
        name:"The Sidewinder",
        description: "The Sidewinder is a 1964 album byt the jazz trumpeter Lee Morgan, recorded at the Van Gelder Studio in Englewood, New Jersey, USA. It was released on the Blue Note label as BLP 4157 and BST 84157. The title track was one of the defining recordings of the soul jazz genre, becoming a jazz standard. The album was identified by Scott Yanow in his Allmusic essay 'Hard Bop' as one of the 17 Essential Hard Bop Recordings.",
        label:"Lee Morgan",
        artist:"Lee Morgan",
        genre:genres[4].id,
        price:"44.99",
        quantity:"2",
        imageFront:"leeMorganTheSidewinderFront.jpg",
        imageBack:"leeMorganTheSidewinderBack.jpg",
        image:"leeMorganTheSidewinderFront.jpg",
        sideATracks:["Boy, What a Night","The Sidewinder","Hocus Pocus"],
        sideBTracks:["Gary's Notebook", "Totem Pole"],
      },
      {
        title:"Traveller",
        name:"Traveller",
        description:"Traveller is the debut studio album by American singer-songwriter Chris Stapleton. The album was produced by Dave Cobb and Stapleton, and was released on May 5, 2015, through Mercury Nashville.",
        label:"Mercury Nashville",
        artist:"Chris Stapleton",
        genre:genres[3].id,
        price:"29.99",
        quantity:"10",
        imageFront:"chrisStapletonTravellerFront.jpg",
        imageBack:"chrisStapletonTravellerBack.jpg",
        image:"chrisStapletonTravellerFront.jpg",
        sideATracks:["Traveller","Fire Away","Tennessee Whiskey","Parachute","Whiskey and You","The Devil Named Music","Outlaw State of Mind","Sometimes I Cry"],
        sideBTracks:["Nobody to Blame","More of You","When the Stars Come Out","Daddy Doesn't Pray Anymore","Might as Well Get Stoned","Was It 26"]
      },
      {
        title:"Purgatory",
        name:"Purgatory",
        description:"Purgatory is the debut studio album by American country music singer Tyler Childers. It was released on August 4, 2017, through Hickman Holler Records and Thirty Tigers. The album was produced by Sturgill Simpson and David Ferguson.",
        label:"Hickman Holler Records",
        artist:"Tyler Childers",
        genre:genres[3].id,
        price:"34.99",
        quantity:"3",
        imageFront:"tylerChildersPurgatoryFront.jpg",
        imageBack:"tylerChildersPurgatoryBack.jpg",
        image:"tylerChildersPurgatoryFront.jpg",
        sideATracks:["I Swear (to God)","Feathered Indians","Tattoos", "Born Again","Whitehouse Road"],
        sideBTracks:["Banded Clovis","Purgatory", "Honky Tonk Flame","Universal Sound","Lady May"]
      },
      {
        title:"Licensed To Ill",
        name: "Licensed To Ill",
        description: "Beastie Boys were an American Hip-Hop group from New York City, formed in 1981. The group was composed of Michael 'Mike D' Diamond, Adam 'MCA' Yauch, and Adam 'Ad-Rock' Horovitz",
        label:"Def Jam",
        artist: "Beastie Boys",
        genre: genres[5].id,
        price: "49.99",
        quantity: "8",
        imageFront:"beastieBoysLicensedToIllFront.jpg",
        imageBack:"beastieBoysLicensedToIllBack.jpg",
        image:"beastieBoysLicensedToIllFront.jpg",
        sideATracks:["Rhymin & Stealin", "The New Style (Ft. DJ Hurricane", "She's Crafty", "Posse Effect", "Slow Ride"],
        sideBTracks:["Girls", "Fight for Your Right", "No Sleep Till Brooklyn", "Paul Revere", "Hold It Now, Hit It"]
      },
      {
        title:"DAMN.",
        name:"DAMN.",
        description: "DAMN. is the fourth studio album by American rapper Kenderick Lamar. Released on April 14, 2017, through Top Dawg Entertainment, Aftermath Entertainment and Interscope Records, critical accolades followed including a Pullitzer Prize for music and the Best Rap Album at the 2018 Grammy Awards.",
        label:"Top Dawg Entertainment",
        artist:"Kendrick Lamar",
        genre:genres[5].id,
        price:"39.99",
        quantity:"5",
        imageFront:"kendrickLamarDAMNFront.png",
        imageBack:"kendrickLamarDAMNBack.png",
        image:"kendrickLamarDAMNFront.png",
        sideATracks:["BLOOD.","DNA.","YAH.","ELEMENT.","FEEL.","LOYALTY.","PRIDE.","HUMBLE."],
        sideBTracks:["LUST.","LOVE.","XXX.","FEAR.","GOD.","DUCKWORTH."]
      },
      {
        title:"Love Story",
        name:"Love Story",
        description:"Love Story is the third studio album by American rapper Yelawolf. It was released on April 21, 2015, by Interscope Records, Shady Records and Slumerican.",
        label:"Interscope Records, Shafty Records, Slumerican",
        artist:"Yelawolf",
        genre:genres[2].id,
        price:"29.99",
        quantity:"3",
        imageFront:"yelawolfLoveStoryFront.jpg",
        imageBack:"yelawolfLoveStoryBack.jpg",
        image:"yelawolfLoveStoryFront.jpg",
        sideATracks:["Outer Space","Change","American You","Whiskey in a Bottle","Ball and Chain","Till It's Gone","Devil in My Veins","Best Friend"],
        sideBTracks:["Empty Bottles","Heartbreak","Tennessee Love","Box Chevy V","Love Story","Johnny Cash","Have a Great Flight", "Sky's the Limit", "Disappear", "Fiddle Me This"]
      },
      {
        title: "Ready to Die",
        name: "Ready to Die",
        description: "Ready to Die is the debut album by American rapper The Notorious B.I.G, released on September 13,1994, by Bad Boy Records and Arista Records. The Album features productions by Bad Boy founder Sean 'Puffy' Combs, Easy Mo Bee, Chucky Thompson, DJ Premier, and Lord Finesse, among others.",
        label: "Bad Boy Records, Arista Records",
        artist: "The Notorious B.I.G.",
        genre: genres[2].id,
        price: "49.99",
        quantity: "5",
        imageFront: "theNotoriousBIGReadyToDieFront.jpg",
        imageBack: "theNotoriousBIGReadyToDieBack.jpg",
        image: "theNotoriousBIGReadyToDieFront.jpg",
        sideATracks:["The What", "One More Chance", "Juicy", "Everyday Struggle", "Big Poppa", "Respect"],
        sideBTracks:["Gimme the Loot", "Machine Gun Funk", "Warning", "Ready to Die", "Suicidal Thoughts", "Friend of Mine"]

      }


      
  ]);

  process.exit();
});
