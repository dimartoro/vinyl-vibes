const db = require('./connection');
const { User, Product, Category, Album, Genre } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Food' },
    { name: 'Household Supplies' },
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Toys' }
  ]);

  await Genre.deleteMany();

  const genres = await Genre.insertMany([
    { name: 'Rock' },
    { name: 'Pop' },
    { name: 'Rap' },
    { name: 'Country' },
    { name: 'Jazz' },
    { name: 'Hip Hop'}
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Tin of Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 2.99,
      quantity: 500
    },
    {
      name: 'Canned Coffee',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'canned-coffee.jpg',
      category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Toilet Paper',
      category: categories[1]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'toilet-paper.jpg',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'Handmade Soap',
      category: categories[1]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'soap.jpg',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Set of Wooden Spoons',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'wooden-spoons.jpg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Camera',
      category: categories[2]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'camera.jpg',
      price: 399.99,
      quantity: 30
    },
    {
      name: 'Tablet',
      category: categories[2]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'tablet.jpg',
      price: 199.99,
      quantity: 30
    },
    {
      name: 'Tales at Bedtime',
      category: categories[3]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'bedtime-book.jpg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Spinning Top',
      category: categories[4]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'spinning-top.jpg',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Set of Plastic Horses',
      category: categories[4]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'plastic-horses.jpg',
      price: 2.99,
      quantity: 1000
    },
    {
      name: 'Teddy Bear',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'teddy-bear.jpg',
      price: 7.99,
      quantity: 100
    },
    {
      name: 'Alphabet Blocks',
      category: categories[4]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'alphabet-blocks.jpg',
      price: 9.99,
      quantity: 600
    }
  ]);

  console.log('products seeded');
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
      imageFront: 'acdcHighWayToHellFront.jpg',
      imageBack: 'acdcHighWayToHellBack.jpg',
      sideATracks:["Highway to Hell", "Girls Got Rhythm", "Walk All Over You","Touch Too Much","Beating Around the Bush"],
      sideBTracks:["Shot Down in Flames", "Get It Hot", "If You Want Blood (You've Got It)","Love Hungry Man","Night Prowler"]
    },
    {  
      title: 'ADELE21',
      description: 'The album was named after the age of the singer during its production. 21 shares the Motown/soul influences of her 2008 debut album 19, but also draws influence from the American country and Southern blues music that Adele started listening to during the North American leg of her tour An Evening with Adele.',
      label: 'XL-Columbia',
      artist: "AC/DC",
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
        imageBack:"p!nkTheTruthAboutLoveBack.png",
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
        imageBack:"ponyBradshawSuddenOperaBack.jpg",
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
        imageBack:"queenTheGameBack.png",
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
      }
  ]);
  console.log('Album seeded', albums);

  await User.deleteMany();
  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
