const playersInfo = {
   'Blue': {color: 'hsla(195, 100%, 50%,0.1)'},
   'Red': {color:"hsla(0, 100%, 50%,0.2)"},
   'Green': {color: 'hsla(84, 100%, 59%, 0.1)'},
   'Yellow': {color: 'hsla(51, 100%, 50%, 0.3)'},
   'Orange': {color: 'hsla(33, 100%, 50%, 0.3)'},
   'Black': {color: 'hsla(0, 0%, 0%, 0.1)'},
   'Brown': {color: 'hsla(25, 76%, 31%, 0.3)'},
   'Purple': {color: 'hsla(300, 100%, 25%, 0.1)'}
 };

 const playersInfoDarkColors = {
    'Blue': {color: 'hsla(195, 100%, 50%,0.6)'},
    'Red': {color:"hsla(0, 100%, 50%,0.6)"},
    'Green': {color: 'hsla(84, 100%, 59%, 0.6)'},
    'Yellow': {color: 'hsla(51, 100%, 50%, 0.6)'},
    'Orange': {color: 'hsla(33, 100%, 50%, 0.6)'},
    'Black': {color: 'hsla(0, 0%, 0%, 0.6)'},
    'Brown': {color: 'hsla(25, 76%, 31%, 0.6)'},
    'Purple': {color: 'hsla(300, 100%, 25%, 0.6)'}
  };

  let topicsData = [ { 'topic': 'Sex',
    'playersPOV': [ Object.assign({}, playersInfo['Blue'],
    {name: 'Blue', pov:`Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation`}),
      Object.assign({}, playersInfo['Red'], {name: 'Red',
      pov:`Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation`}),
      Object.assign({}, playersInfo['Green'], {name: 'Green'}),
      Object.assign({}, playersInfo['Yellow'], {name: 'Yellow'}),
      Object.assign({}, playersInfo['Orange'], {name: 'Orange'}),
      Object.assign({}, playersInfo['Black'], {name: 'Black'}),
      Object.assign({}, playersInfo['Brown'], {name: 'Brown'}),
      Object.assign({}, playersInfo['Purple'], {name: 'Purple'})
    ]},
    {'topic': 'Religion',
      'playersPOV': [ Object.assign({}, playersInfo['Blue'],
      {name: 'Blue', pov:`Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation`}),
        Object.assign({}, playersInfo['Red'], {name: 'Red'})
      ]},
      {'topic': 'Politics', 'playersPOV' : []}
    ];


    let downvotesData = [
      {playerName: 'Blue', playerColor: playersInfo['Blue']['color']},
      {playerName: 'Orange', playerColor: playersInfo['Orange']['color']},
      {playerName: 'Yellow', playerColor: playersInfo['Yellow']['color']},
    ];

    let notificationsData = [
        {title: 'Notification Title #1', body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation` },
        {title: 'Notification Title #2', body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation` },
        {title: 'Notification Title #3', body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation` },
        {title: 'Notification Title #4', body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation` }
    ]

    let playersData = [
                    {downvotes: 0, read: false, pov: false, color: playersInfoDarkColors['Blue']['color']},
                    {downvotes: 0, read: false, pov: false, color: playersInfoDarkColors['Red']['color']},
                    {downvotes: 0, read: false, pov: false, color: playersInfoDarkColors['Green']['color']},
                    {downvotes: 0, read: false, pov: false, color: playersInfoDarkColors['Yellow']['color']},
                    {downvotes: 0, read: false, pov: false, color: playersInfoDarkColors['Orange']['color']},
                    {downvotes: 0, read: false, pov: false, color: playersInfoDarkColors['Black']['color']},
                    {downvotes: 0, read: false, pov: false, color: playersInfoDarkColors['Brown']['color']},
                    {downvotes: 0, read: false, pov: false, color: playersInfoDarkColors['Purple']['color']}
    ];

    let newsData = [
      {message: "Message #1: Just dummy text fo fill this line, brrrrr !!!", date: new Date(), alert: true},
      {message: "Message #2: Arooooo", date: new Date()},
      {message: "Message #3: Is it me you are looking for?", date: new Date()},
      {message: "Message #4: I do not think so", date: new Date(), alert: true},
      {message: "Message #5", date: new Date()},
      {message: "Message #6", date: new Date()},
      {message: "Message #7", date: new Date(), alert: true},
      {message: "Message #8", date: new Date()},
      {message: "Message #9", date: new Date()},
      {message: "Message #10", date: new Date()}


    ];

export {  playersInfo, playersInfoDarkColors, topicsData, playersData,
          notificationsData, downvotesData, newsData };
