var express = require('express'),
    app = express();

var request	   = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var db  = require('./models');

var inmateList = 
	[
    {
      "book_date_formatted": "Apr 30, 2017",
      "name": "Zbabs2017",
      "mugshot": "https://imgstore.jailbase.com/small/arrested/co-kccso/2017-04-30/zackary-babcock-2457b6e5a843b6e724b48ab95d178cfc.pic1.jpg",
      "book_date": "2017-04-30",
      "charges": [
        "Domestic violence",
        "Criminal mischief",
        "Assault in the third degree"
      ],
      "id": 18786952,
      "more_info_url": "http://www.jailbase.com/en/co-kccsozackary-babcock-18786952"
    },
    {
      "book_date_formatted": "Apr 30, 2017",
      "name": "DomesticDorothy23",
      "mugshot": "https://imgstore.jailbase.com/small/arrested/co-kccso/2017-04-30/dorothy-chrostowski-ccd124d1954b91eed16308ba9f09e698.pic1.jpg",
      "book_date": "2017-04-30",
      "charges": [
        "Domestic violence",
        "Criminal mischief",
        "Assault in the third degree",
      ],
      "id": 18786951,
      "more_info_url": "http://www.jailbase.com/en/co-kccsodorothy-chrostowski-18786951"
    },
    {
      "book_date_formatted": "Apr 28, 2017",
      "name": "CatchMeIfYouCan99",
      "mugshot": "https://imgstore.jailbase.com/small/arrested/co-kccso/2017-04-28/gary-morales-26ab7ae106c18885c7547effd2cda1da.pic1.jpg",
      "book_date": "2017-04-28",
      "charges": [
        "Fugitive of justice"
      ],
      "id": 18767307,
      "more_info_url": "http://www.jailbase.com/en/co-kccsogary-morales-18767307"
    },
    {
      "book_date_formatted": "Apr 27, 2017",
      "name": "ICanBreakTheseBonds22",
      "mugshot": "https://imgstore.jailbase.com/small/arrested/co-kccso/2017-04-27/george-leon-c94542a706c6f1de7e5a7a796b204f7e.pic1.jpg",
      "book_date": "2017-04-27",
      "charges": [
        "Violation of restraining order",
        "Violation of bail bond conditions"
      ],
      "id": 18753085,
      "more_info_url": "http://www.jailbase.com/en/co-kccsogeorge-leon-18753085"
    },
    {
      "book_date_formatted": "Apr 27, 2017",
      "name": "CanDoTheTime89",
      "mugshot": "https://imgstore.jailbase.com/small/arrested/co-kccso/2017-04-27/briana-stover-2ae0cf2efb4e623e183c1c47b0738944.pic1.jpg",
      "book_date": "2017-04-27",
      "charges": [
        "Protection order violation"
      ],
      "id": 18753084,
      "more_info_url": "http://www.jailbase.com/en/co-kccsobriana-stover-18753084"
    },
    {
      "book_date_formatted": "Apr 24, 2017",
      "name": "lilRascal1223",
      "mugshot": "https://imgstore.jailbase.com/small/arrested/co-kccso/2017-04-24/tyrel-duell-8861cf2c6499c8f9a45222a7fc798f96.pic1.jpg",
      "book_date": "2017-04-24",
      "charges": [
        "Domestic violence",
        "Criminal mischief"
      ],
      "id": 18728935,
      "more_info_url": "http://www.jailbase.com/en/co-kccsotyrel-duell-18728935"
    },
    {
      "book_date_formatted": "Apr 23, 2017",
      "name": "2Fast2Furious",
      "mugshot": "https://imgstore.jailbase.com/small/arrested/co-kccso/2017-04-23/bryant-lawson-b7033fdbbfe23e5be6620e9ca76efe11.pic1.jpg",
      "book_date": "2017-04-23",
      "charges": [
        "Weaving (Failed to drive in a single lane)",
        "No insurance (Person operated vehicle)",
        "Drove vehicle with BAC of .08 or more",

      ],
      "id": 18705810,
      "more_info_url": "http://www.jailbase.com/en/co-kccsobryant-lawson-18705810"
    },
    {
      "book_date_formatted": "Apr 22, 2017",
      "name": "SoupNazi3",
      "mugshot": "https://imgstore.jailbase.com/small/arrested/co-kccso/2017-04-22/edwin-alvarenga-zelaya-f98d86f0262c653f3170318f11b982c6.pic1.jpg",
      "book_date": "2017-04-22",
      "charges": [
        "No valid driver's license",
        "Failure to appear",
        "Drove vehicle with BAC of .08 or more",
        "Drove under the influence of alcohol",
        "Driving under revocation as HTO",
        "Careless driving"
      ],
      "id": 18705812,
      "more_info_url": "http://www.jailbase.com/en/co-kccsoedwin-alvarenga-zelaya-18705812"
    },
    {
      "book_date_formatted": "Apr 21, 2017",
      "name": "RickyBobby1982",
      "mugshot": "https://imgstore.jailbase.com/small/arrested/co-kccso/2017-04-21/laroy-dewberry-7678e36e071d23140a2bbee59fd80cd0.pic1.jpg",
      "book_date": "2017-04-21",
      "charges": [
        "Unlawfully carrying a concealed weapon",
        "Speeding",
        "Drove vehicle while license denied/revok",
        "Unlawfully carrying a concealed weapon"
      ],
      "id": 18705811,
      "more_info_url": "http://www.jailbase.com/en/co-kccsolaroy-dewberry-18705811"
    },
    {
      "book_date_formatted": "Apr 21, 2017",
      "name": "mysteryGal2001",
      "mugshot": "https://imgstore.jailbase.com/widgets/NoMug.gif",
      "book_date": "2017-04-21",
      "charges": [
        "Transport hold"
      ],
      "id": 18697072,
      "more_info_url": "http://www.jailbase.com/en/co-kccsosarah-smith-18697072"
    },
    {
    "book_date_formatted": "May 02, 2017",
    "name": "HashRulesEverythingaroundme",
    "mugshot": "https://imgstore.jailbase.com/small/arrested/co-mcso/2017-05-02/kasha-strong-2c985e1ece1b0bc7eb80baf3809a10e0.pic1.jpg",
    "book_date": "2017-05-02",
    "charges": [
        "Possession Of Schedule I/ii",
        "Possession Of Drug Paraphernalia",
        "Open Marijuana Containerpen Marijuana Container - Motor Vehicle",
        "Drove Vehicle without",
        "Compulsory Insurance - Penalty - Repeal",
        "Turning Movements And Required Signals"
    ],
    "id": 18801639,
    "more_info_url": "http://www.jailbase.com/en/co-mcsokasha-strong-18801639"
    },
    {
    "book_date_formatted": "May 01, 2017",
    "name": "BottomsUp22",
    "mugshot": "https://imgstore.jailbase.com/widgets/NoMug.gif",
    "book_date": "2017-05-01",
    "charges": [
      "Violation Of Registration Provisions - P",
      "Open Alcoholic Beverage In Motor Vehicle",
      "Failed To Present Evidence Of Insurance",
      "Drove Vehilce Under The Influence Of Alc",
      "Driving Under Restraint - Alcohol"
    ],
    "id": 18801638,
    "more_info_url": "http://www.jailbase.com/en/co-mcsotodd-haff-18801638"
    },
    {
    "book_date_formatted": "May 01, 2017",
    "name": "freeRider12",
    "mugshot": "https://imgstore.jailbase.com/widgets/NoMug.gif",
    "book_date": "2017-05-01",
    "charges": [
      "Required Position And Method Of Turning",
      "Drove Vehicle Without A Valid Drivers Li",
      "Compulsory Insurance - Penalty - Repeal"
      ],
    "id": 18790968,
    "more_info_url": "http://www.jailbase.com/en/co-mcsojoshua-dutkiewicz-18790968"
    },
    {
    "book_date_formatted": "May 01, 2017",
    "name": "SassyAF",
    "mugshot": "https://imgstore.jailbase.com/small/arrested/co-mcso/2017-05-01/ashley-steadman-e8e7cf6269537fc94a571e8a870cb11f.pic1.jpg",
    "book_date": "2017-05-01",
    "charges": [],
    "id": 18785539,
    "more_info_url": "http://www.jailbase.com/en/co-mcsoashley-steadman-18785539"
    },
    {
    "book_date_formatted": "May 01, 2017",
    "name": "Ramon12",
    "mugshot": "https://imgstore.jailbase.com/small/arrested/co-mcso/2017-05-01/ramon-chavez-c554be0f197358ffa5e543a317c2a1ab.pic1.jpg",
    "book_date": "2017-05-01",
    "charges": [
      "Contributing To The Delinquency Of A Min"
       ],
    "id": 18785538,
    "more_info_url": "http://www.jailbase.com/en/co-mcsoramon-chavez-18785538"
    },
    {
    "book_date_formatted": "May 01, 2017",
    "name": "Funkyfressh2",
    "mugshot": "https://imgstore.jailbase.com/small/arrested/co-mcso/2017-05-01/xavier-funk-c70a90ca4a4e3b1a044c64209a6052e0.pic1.jpg",
    "book_date": "2017-05-01",
    "charges": [
      "Crime Of Violation Of A Restraining Orde"
       ],
    "id": 18785537,
    "more_info_url": "http://www.jailbase.com/en/co-mcsoxavier-funk-18785537"
    },
    {
    "book_date_formatted": "Apr 30, 2017",
    "name": "Brian",
    "mugshot": "https://imgstore.jailbase.com/small/arrested/co-mcso/2017-04-30/brian-simillion-c7486b5ba7594361863132ff96084797.pic1.jpg",
    "book_date": "2017-04-30",
    "charges": [
      "Theft - $50 > $300",
      "1st Deg. Criminal Trespass",
      "Theft - $50 > $300"
        ],
    "id": 18788365,
    "more_info_url": "http://www.jailbase.com/en/co-mcsobrian-simillion-18788365"
    },
    {
    "book_date_formatted": "Apr 30, 2017",
    "name": "CantStopWontStop",
    "mugshot": "https://imgstore.jailbase.com/small/arrested/co-mcso/2017-04-30/stuart-ridenour-3e3707d3dd842d858a0ff0533fdf1410.pic1.jpg",
    "book_date": "2017-04-30",
    "charges": [
      "Crime Of Violation Of A Restraining Orde"
         ],
    "id": 18788364,
    "more_info_url": "http://www.jailbase.com/en/co-mcsostuart-ridenour-18788364"
    },
    {
    "book_date_formatted": "Apr 28, 2017",
    "name": "IceIceBaby",
    "mugshot": "https://imgstore.jailbase.com/small/arrested/co-mcso/2017-04-28/alfredo-figueroa-reyes-28e1985420c077adce8455ec54307751.pic1.jpg",
    "book_date": "2017-04-28",
    "charges": [
      "Immigration - Ice"
         ],
    "id": 18769012,
    "more_info_url": "http://www.jailbase.com/en/co-mcsoalfredo-figueroa-reyes-18769012"
    },
    {
    "book_date_formatted": "Apr 27, 2017",
    "name": "Cruisenn",
    "mugshot": "https://imgstore.jailbase.com/small/arrested/co-mcso/2017-04-27/clinton-forward-f40a523c232ba82ee62418e47016bb00.pic1.jpg",
    "book_date": "2017-04-27",
    "charges": [
      "Drove Vehilce Under The Influence Of Alc",
      "Contributing To The Delinquency Of A Min",
      "Child Abuse",
      "Drove Vehilce Under The Influence Of Alc"
         ],
    "id": 18756717,
    "more_info_url": "http://www.jailbase.com/en/co-mcsoclinton-forward-18756717"
    }
  ];

		db.Inmate.remove({}, function(err, inmates){
		
		if (err) {
			console.log('error occurred in remove', err);
		} else {
			console.log('removed all inmates');
		}
	});
		//create new records based on dog array
		db.Inmate.create(inmateList, function(err, inmates){
			if (err) { return console.log('err', err); }
			console.log("created", inmateList.length, "inmates");
			process.exit();
		});

