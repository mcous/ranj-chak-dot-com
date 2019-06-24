import { createElement, Fragment } from 'preact'
import { ModalLink } from '../Modal'
import { SectionContentMap } from '../types'

export const CONTENT_BY_SECTION: SectionContentMap = {
  film: [
    {
      name: 'Why a US city is searching for mass graves',
      label: `White mobs destroyed "Black Wall Street." But where are the victims' bodies?`,
      thumbnail: {
        src: require('../images/video/tulsa-mass-graves.thumb.jpg'),
        lowResSrc: require('../images/video/tulsa-mass-graves.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=x-ItsPBTFO0',
      modal: true,
    },
    {
      name: 'How the British failed India and Pakistan',
      label:
        'The two nations were born at war — which can be traced back to this British strategy',
      thumbnail: {
        src: require('../images/video/india-pakistan.thumb.jpg'),
        lowResSrc: require('../images/video/india-pakistan.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=OIVPi0bvmtI',
      modal: true,
    },
    {
      name: 'Cereal makers sold us a breakfast myth',
      label: 'Is breakfast the most important meal of the day?',
      thumbnail: {
        src: require('../images/video/breakfast.thumb.jpg'),
        lowResSrc: require('../images/video/breakfast.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=9Ffceu672c4',
      modal: true,
    },
    {
      name: 'When white supremacists overthrew a government',
      label: 'The hidden history of an American coup',
      thumbnail: {
        src: require('../images/video/wilmington-coup.thumb.jpg'),
        lowResSrc: require('../images/video/wilmington-coup.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=LVQomlXMeek',
      modal: true,
    },
    {
      name: 'The problem with video gambling machines',
      label:
        'What happened when Illinois legalized machines known as “the crack cocaine of gambling”',
      thumbnail: {
        src: require('../images/video/video-gambling.thumb.jpg'),
        lowResSrc: require('../images/video/video-gambling.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=_Wb2Rddn3nk',
      modal: true,
    },
    {
      name: 'The Kamasutra is not (just) about sex',
      label: 'Here’s what the Kamasutra really says',
      thumbnail: {
        src: require('../images/video/kamasutra.thumb.jpg'),
        lowResSrc: require('../images/video/kamasutra.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=wvYeIfvtJM0',
      modal: true,
    },
    {
      name: 'The big problem with how we pick juries',
      label: 'A legal loophole makes juries less diverse',
      thumbnail: {
        src: require('../images/video/jury-selection.thumb.jpg'),
        lowResSrc: require('../images/video/jury-selection.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=cPRK_ABldIk',
      modal: true,
    },
    {
      name: 'How ID laws can put trans people in danger',
      label: `There's a trans murder crisis across the country`,
      thumbnail: {
        src: require('../images/video/id-laws.thumb.jpg'),
        lowResSrc: require('../images/video/id-laws.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=900bLSMuA4A',
      modal: true,
    },
    {
      name: `How "levee wars" are making floods worse`,
      label: 'Explained with a giant, scientific model',
      thumbnail: {
        src: require('../images/video/levee-wars.thumb.jpg'),
        lowResSrc: require('../images/video/levee-wars.lores.jpg'),
        color: '#4f553f',
      },
      link: 'https://www.youtube.com/watch?v=LTv6RkFnelM',
      modal: true,
    },
    {
      name: 'Why the street gang MS-13 is an American problem',
      label: 'We need to separate fact from fiction about MS-13',
      thumbnail: {
        src: require('../images/video/ms-13.thumb.jpg'),
        lowResSrc: require('../images/video/ms-13.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=CgKpACQyhgk',
      modal: true,
    },
    {
      name: 'The voices of children separated at the border',
      label: 'Over 2,300 children have been separated from their families',
      thumbnail: {
        src: require('../images/video/border-separations.thumb.jpg'),
        lowResSrc: require('../images/video/border-separations.lores.jpg'),
        color: '#292929',
      },
      link: 'https://www.youtube.com/watch?v=ItWweMVi41s',
      modal: true,
    },
    {
      name: 'How IBM quietly pushed out 20,000 older workers',
      label: 'Age discrimination can be very hard to prove',
      thumbnail: {
        src: require('../images/video/ibm.thumb.jpg'),
        lowResSrc: require('../images/video/ibm.lores.jpg'),
        color: '#959892',
      },
      link: 'https://www.youtube.com/watch?v=e681QNbHloE',
      modal: true,
    },
    {
      name: 'The culture war between doctors and midwives, explained',
      label:
        'A deeper look at history explains why when it comes to midwife use, the US falls behind other affluent countries',
      thumbnail: {
        src: require('../images/video/midwives.thumb.jpg'),
        lowResSrc: require('../images/video/midwives.lores.jpg'),
        color: '#888387',
      },
      link: 'https://www.youtube.com/watch?v=SE34K88LUek',
      modal: true,
    },
    {
      name: 'When the only way to go free is to plead guilty',
      label:
        'A confounding case in Baltimore shows just how far prosecutors will go to keep a win on the books',
      thumbnail: {
        src: require('../images/video/guilty-plea.thumb.jpg'),
        lowResSrc: require('../images/video/guilty-plea.lores.jpg'),
        color: '#b7ae8f',
      },
      link: 'https://www.youtube.com/watch?v=rwAyoX8D3YE',
      modal: true,
    },
    {
      name: 'Walking while black',
      label:
        'Jacksonville’s enforcement of pedestrian violations raises concerns about another example of racial profiling',
      thumbnail: {
        src: require('../images/video/walking-while-black.thumb.jpg'),
        lowResSrc: require('../images/video/walking-while-black.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=lJFqvRwOiis',
      modal: true,
    },
    {
      name: 'The US medical system is still haunted by slavery',
      label: `Black women's history matters in medicine`,
      thumbnail: {
        src: require('../images/video/medicine-and-slavery.thumb.jpg'),
        lowResSrc: require('../images/video/medicine-and-slavery.lores.jpg'),
        color: '#888268',
      },
      link: 'https://www.youtube.com/watch?v=IfYRzxeMdGs',
      modal: true,
    },
    {
      name: 'How this military explosive is poisoning American soil',
      label: 'The bomb that went off twice',
      thumbnail: {
        src: require('../images/video/rdx.thumb.jpg'),
        lowResSrc: require('../images/video/rdx.lores.jpg'),
      },
      link: 'https://www.youtube.com/watch?v=l2StCpw8z-s',
      modal: true,
    },
    {
      name: 'How drug companies make you buy more medicine than you need',
      label: 'They make eye drops too big -- and make you pay for the waste',
      thumbnail: {
        src: require('../images/video/eye-drops.thumb.jpg'),
        lowResSrc: require('../images/video/eye-drops.lores.jpg'),
        color: '#c2c3bf',
      },
      link: 'https://www.youtube.com/watch?v=TVTnwSAFNsQ',
      modal: true,
    },
    {
      name: 'Transition At Twelve',
      label:
        'Dozens of transgender children and teens have been treated through a trailblazing Dallas clinic',
      thumbnail: {
        src: require('../images/video/transition-at-twelve.thumb.jpg'),
        lowResSrc: require('../images/video/transition-at-twelve.lores.jpg'),
      },
      link: 'https://vimeo.com/140197201',
      modal: true,
    },
    {
      name: 'Behind the Screen',
      label:
        'In Reynosa, a Mexican border city, there are hundreds of assembly plants that feed global demand; but at what price?',
      thumbnail: {
        src: require('../images/video/behind-the-screen.thumb.jpg'),
        lowResSrc: require('../images/video/behind-the-screen.lores.jpg'),
        color: '#745c51',
      },
      link: 'https://vimeo.com/151824169',
      modal: true,
    },
    {
      name: 'LGBTQ in India',
      label:
        "A look at the effects of India's Penal Code 377: the law against homosexuality",
      thumbnail: {
        src: require('../images/video/lgbtq-in-india.thumb.jpg'),
        lowResSrc: require('../images/video/lgbtq-in-india.lores.jpg'),
        color: '#5f5c5b',
      },
      link: 'https://vimeo.com/219460952',
      modal: true,
    },
    {
      name: 'The Cost of a Gunshot',
      label:
        'More than 2,500 Chicagoans were shot in 2014, but what happens to the vast majority who survive?',
      thumbnail: {
        src: require('../images/video/cost-of-a-gunshot.thumb.jpg'),
        lowResSrc: require('../images/video/cost-of-a-gunshot.lores.jpg'),
        color: '#867d84',
      },
      link: 'https://vimeo.com/125630343',
      modal: true,
    },
    {
      name: 'Locked Up For Life',
      label:
        'After the U.S. Supreme Court struck down life without parole for child convicts, Adolfo Davis hoped for a second chance',
      thumbnail: {
        src: require('../images/video/locked-up-for-life.thumb.jpg'),
        lowResSrc: require('../images/video/locked-up-for-life.lores.jpg'),
        color: '#6b6336',
      },
      link: 'https://vimeo.com/125630149',
      modal: true,
    },
    {
      name: 'False Confessions',
      label:
        'Sundhe Moses spent 18 years in prison for a murder he confessed to but says he wasn’t guilty of',
      thumbnail: {
        src: require('../images/video/false-confessions.thumb.jpg'),
        lowResSrc: require('../images/video/false-confessions.lores.jpg'),
        color: '#544430',
      },
      link: 'https://vimeo.com/125630456',
      modal: true,
    },
    {
      name: 'Million Dollar Blocks',
      label:
        'On some blocks, states pay $1 million a year to incarcerate residents, and the cost to families can also be crippling',
      thumbnail: {
        src: require('../images/video/million-dollar-blocks.thumb.jpg'),
        lowResSrc: require('../images/video/million-dollar-blocks.lores.jpg'),
        color: '#99978b',
      },
      link: 'https://vimeo.com/147783798',
      modal: true,
    },
    {
      name: 'Stop Telling Women to Smile',
      label:
        'One woman is battling street harassment by showing the world the faces of its victims',
      thumbnail: {
        src: require('../images/video/stop-telling-women-to-smile.thumb.jpg'),
        lowResSrc: require('../images/video/stop-telling-women-to-smile.lores.jpg'),
      },
      link: 'https://vimeo.com/125628085',
      modal: true,
    },
    {
      name: 'Dirty Coal',
      label:
        'The Moapa Band of Paiute Indians thought coal ash from a nearby plant was killing them off, so they fought back',
      thumbnail: {
        src: require('../images/video/dirty-coal.thumb.jpg'),
        lowResSrc: require('../images/video/dirty-coal.lores.jpg'),
        color: '#5e4f4d',
      },
      link: 'https://vimeo.com/125629931',
      modal: true,
    },
    {
      name: 'Nuclear Graveyard',
      label:
        'Self-described "mad junkyard dog" Patty Ameno has been on a mission to clean up her hometown\'s nuclear waste',
      thumbnail: {
        src: require('../images/video/nuclear-graveyard.thumb.jpg'),
        lowResSrc: require('../images/video/nuclear-graveyard.lores.jpg'),
      },
      link: 'https://vimeo.com/125630254',
      modal: true,
    },
    {
      name: 'Driven',
      label:
        'Estaifan Shilaita has chosen a life in constant motion; once a boxing champ in Iran, he tells us what brought him behind the wheel of a Chicago taxi',
      thumbnail: {
        src: require('../images/video/driven.thumb.jpg'),
        lowResSrc: require('../images/video/driven.lores.jpg'),
        color: '#5b594d',
      },
      link: 'https://vimeo.com/125628151',
      modal: true,
    },
  ],
  writing: [
    {
      name: 'For families of the incarcerated, conviction comes with a cost',
      label:
        'On some blocks, states pay $1 million a year to incarcerate residents, and the cost to families can also be crippling',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/12/7/for-families-of-the-incarcerated-conviction-comes-with-a-cost.html',
      thumbnail: {
        src: require('../images/writing/million-dollar-blocks.thumb.jpg'),
        lowResSrc: require('../images/writing/million-dollar-blocks.lores.jpg'),
        color: '#3f2c26',
      },
    },
    {
      name: 'Transition at 12: Growing up transgender in Texas',
      label:
        'Dozens of children and teens have been treated through a trailblazing Dallas clinic',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/9/20/transition-at-12-transgender-texas.html',
      thumbnail: {
        src: require('../images/writing/transition-at-twelve.thumb.jpg'),
        lowResSrc: require('../images/writing/transition-at-twelve.lores.jpg'),
        color: '#9e988b',
      },
    },
    {
      name: "The ignored injuries of Reynosa's factory workers",
      label:
        'In Reynosa, a Mexican border city, there are hundreds of assembly plants that feed global demand; but at what price?',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/multimedia/2015/9/the-increasingly-serious-injuries-of-mexican-factory-workers.html',
      thumbnail: {
        src: require('../images/writing/reynosa-workers.thumb.jpg'),
        lowResSrc: require('../images/writing/reynosa-workers.lores.jpg'),
        color: '#906f6a',
      },
    },
    {
      name: 'What it means to be a bullied transgender kid in Texas',
      label:
        'How does the trans community move on after Houston’s rejection of the ‘bathroom bill’?',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/11/10/bullied-transgender-kid-in-texas-bathroom-bill-lgbt.html',
      thumbnail: {
        src: require('../images/writing/trans-bullying.thumb.jpg'),
        lowResSrc: require('../images/writing/trans-bullying.lores.jpg'),
        color: '#66564f',
      },
    },
    {
      name:
        'In Texas, trailer park fights mobile-home moguls for affordable housing',
      label:
        'Trailer park residents in the Austin area fight to keep one of its last strongholds of affordable housing',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/10/28/trailer-parks-price-gouging-texas.html',
      thumbnail: {
        src: require('../images/writing/trailer-park.thumb.jpg'),
        lowResSrc: require('../images/writing/trailer-park.lores.jpg'),
        color: '#ab8468',
      },
    },
    {
      name: 'How calling 911 can punish a domestic violence victim',
      label:
        'In some cities, nuisance laws force domestic violence victims to decide between calling police and staying in their home',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/7/20/how-calling-911-can-punish-a-domestic-violence-victim.html',
      thumbnail: {
        src: require('../images/writing/domestic-violence.thumb.jpg'),
        lowResSrc: require('../images/writing/domestic-violence.lores.jpg'),
        color: '#5b483c',
      },
    },
    {
      name: 'Parents with disabilities fight to keep their kids',
      label:
        'Despite all the rights Americans with disabilities have gained in the last 25 years, the right to parent remains elusive',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/5/29/parents-disabilities-discrimination.html',
      thumbnail: {
        src: require('../images/writing/parents-with-disabilities.thumb.jpg'),
        lowResSrc: require('../images/writing/parents-with-disabilities.lores.jpg'),
        color: '#695962',
      },
    },
    {
      name:
        'Imprisoned at 14, Illinois inmate gets resentenced to life without parole',
      label:
        'After the U.S. Supreme Court struck down life without parole for child convicts, Adolfo Davis hoped for a second chance',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/5/4/adolfo-davis-life-parole.html',
      thumbnail: {
        src: require('../images/writing/adolfo-davis.thumb.jpg'),
        lowResSrc: require('../images/writing/adolfo-davis.lores.jpg'),
        color: '#7f7c7b',
      },
    },
    {
      name: 'Exclusive: My grandfather runs an Amish cult from prison',
      label:
        'The son of two Bergholz Barbers speaks out for the first time about the insular Ohio community he says he escaped',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/10/28/ohio-amish-beardcuttingcult.html',
      thumbnail: {
        src: require('../images/writing/amish-beard-cutting.thumb.jpg'),
        lowResSrc: require('../images/writing/amish-beard-cutting.lores.jpg'),
        color: '#7a7767',
      },
    },
    {
      name: 'Race and Ferguson’s City Council',
      label:
        'Two candidates – one black, one white – in the country’s ‘biggest local election’ on the issues facing Ferguson',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/4/3/the-ferguson-swing-seat.html',
      thumbnail: {
        src: require('../images/writing/ferguson.thumb.jpg'),
        lowResSrc: require('../images/writing/ferguson.lores.jpg'),
        color: '#5e4335',
      },
    },
    {
      name:
        "Timeline: Pennsylvania 'junkyard dog' pushes to rid town of nuclear waste",
      label:
        'Self-described "mad junkyard dog" Patty Ameno has been on a mission to clean up her hometown\'s nuclear waste',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/2/10/timeline-pennsylvania-junkyard-dog-pushes-to-rid-town-of-nuclear-waste.html',
      thumbnail: {
        src: require('../images/writing/pennsylvania-nukes.thumb.jpg'),
        lowResSrc: require('../images/writing/pennsylvania-nukes.lores.jpg'),
        color: '#979390',
      },
    },
    {
      name: 'Black, young and unarmed: The case of Cameron Tillman',
      label:
        "Six weeks after Michael Brown's death, a police officer killed a black teen in Louisiana with no explanation",
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/12/6/black-young-and-unarmedthecaseofcamerontillman.html',
      thumbnail: {
        src: require('../images/writing/cameron-tillman.thumb.jpg'),
        lowResSrc: require('../images/writing/cameron-tillman.lores.jpg'),
        color: '#88462c',
      },
    },
    {
      name: 'Left Behind: Families without paid leave are struggling',
      label:
        'Two New Hampshire mothers call for politicians to fight for paid leave',
      link:
        'http://america.aljazeera.com/features/2016/2/2016-left-behind-meet-the-voters.html#featureArticle-chapter--3',
      thumbnail: {
        src: require('../images/writing/paid-leave.thumb.jpg'),
        lowResSrc: require('../images/writing/paid-leave.lores.jpg'),
        color: '#654440',
      },
    },
    {
      name:
        'Take back the streets: Fighting harassment with feminist street art',
      label:
        'One woman is battling street harassment by showing the world the faces of its victims',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/10/30/stop-telling-womentosmiletakingonharassmentwithfeministstreetart.html',
      thumbnail: {
        src: require('../images/writing/stop-telling-women-to-smile.thumb.jpg'),
        lowResSrc: require('../images/writing/stop-telling-women-to-smile.lores.jpg'),
        color: '#828692',
      },
    },
    {
      name: 'To save rural hospitals, a Republican mayor marches on Washington',
      label:
        "On health care, N.C. Mayor Adam O'Neal went a different direction from most other Republicans – for about 275 miles",
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2014/7/29/to-save-rural-hospitalsarepublicanmayormarchesonwashington.html',
      thumbnail: {
        src: require('../images/writing/mayor-march.thumb.jpg'),
        lowResSrc: require('../images/writing/mayor-march.lores.jpg'),
        color: '#626e96',
      },
    },
    {
      name:
        'Is the University of Montana the ‘blueprint’ for sexual assault response?',
      label:
        'Rape reports involving Montana football players led to a Justice Department overhaul of sexual assault policies',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2015/4/17/is-the-university-of-montana-the-blueprint-for-sexual-assault-response.html',
      thumbnail: {
        src: require('../images/writing/montana.thumb.jpg'),
        lowResSrc: require('../images/writing/montana.lores.jpg'),
        color: '#564545',
      },
    },
    {
      name: 'Would you crowd fund your maternity leave?',
      label:
        'A new site, MyBabyBond.com, allows parents to register for money to cover time off with a newborn',
      link:
        'http://america.aljazeera.com/watch/shows/america-tonight/articles/2016/2/3/would-you-crowd-fund-your-maternity-leave.html',
      thumbnail: {
        src: require('../images/writing/crowd-funded-maternity.thumb.jpg'),
        lowResSrc: require('../images/writing/crowd-funded-maternity.lores.jpg'),
        color: '#7791a6',
      },
    },
  ],
  art: [
    {
      name: 'Arundhati Roy',
      link: require('../images/art/arundhati.jpg'),
      thumbnail: {
        src: require('../images/art/arundhati.thumb.jpg'),
        lowResSrc: require('../images/art/arundhati.lores.jpg'),
        color: '#94828f',
      },
      modal: true,
    },
    {
      name: 'Yuri Kochiyama',
      link: require('../images/art/yuri.jpg'),
      thumbnail: {
        src: require('../images/art/yuri.thumb.jpg'),
        lowResSrc: require('../images/art/yuri.lores.jpg'),
        color: '#a9854d',
      },
      modal: true,
    },
    {
      name: 'Toni Morrison',
      link: require('../images/art/toni.jpg'),
      thumbnail: {
        src: require('../images/art/toni.thumb.jpg'),
        lowResSrc: require('../images/art/toni.lores.jpg'),
        color: '#6e7f7d',
      },
      modal: true,
    },
    {
      name: 'Gloria Anzaldúa',
      link: require('../images/art/gloria.jpg'),
      thumbnail: {
        src: require('../images/art/gloria.thumb.jpg'),
        lowResSrc: require('../images/art/gloria.lores.jpg'),
        color: '#8b5651',
      },
      modal: true,
    },
    {
      name: 'Nope',
      link: require('../images/art/nope.jpg'),
      thumbnail: {
        src: require('../images/art/nope.thumb.jpg'),
        lowResSrc: require('../images/art/nope.lores.jpg'),
        color: '#f19dde',
      },
      modal: true,
    },
    {
      name: 'Mudras',
      link: require('../images/art/mudras.gif'),
      thumbnail: {
        src: require('../images/art/mudras.thumb.jpg'),
        lowResSrc: require('../images/art/mudras.lores.jpg'),
        color: '#ddaca4',
      },
      modal: true,
    },
  ],
  about: {
    doodle: {
      areas: [
        {
          box: [0.18, 0.22, 0.43, 0.38],
          image: require('../images/figure/feminist.png'),
        },
        {
          box: [0.62, 0.22, 0.92, 0.34],
          image: require('../images/figure/doodler.png'),
        },
        {
          box: [0.62, 0.34, 0.92, 0.46],
          image: require('../images/figure/wine.png'),
        },
        {
          box: [0.62, 0.46, 0.92, 0.8],
          image: require('../images/figure/indian.png'),
        },
        {
          box: [0.18, 0.46, 0.43, 0.7],
          image: require('../images/figure/texan.png'),
        },
      ],
      defaultImage: require('../images/figure/journalist.png'),
    },
    content: [
      <Fragment key={0}>
        Hi! I&apos;m Ranjani, a Brooklyn-based video journalist. I&apos;m
        currently a producer at Vox.com, where my work focuses largely on social
        justice, criminal justice, and inequality — and how they all intersect.
        I love a good story, and I&apos;ll do nearly anything to tell it
        beautifully.
      </Fragment>,
      <Fragment key={1}>
        I previously produced with National Geographic on <em>Explorer</em> and
        Al Jazeera America on <em>America Tonight</em>. Prior to that, I was an
        associate producer with the NBC News Associates program in New York,
        where I contributed to <em>Dateline</em>, <em>The Today Show</em>, and{' '}
        <em>Nightly News</em>. During my time at 30 Rock, it&apos;s important to
        note that Tina Fey once shook my hand.
      </Fragment>,
      <Fragment key={2}>
        I&apos;m a Medill/Northwestern University alum, through which I&apos;ve
        completed independent grant projects and international reporting in
        Johannesburg, South Africa; Pune, India; and Marrakesh, Morocco.
      </Fragment>,
      <Fragment key={3}>
        Want to say hi? Contact me using whichever is your favorite method from
        the icons above.
      </Fragment>,
      <Fragment key={4}>
        Or feel like you really need to get to know me first? For a more
        in-depth breakdown of the things I love, I drew y’all{' '}
        <ModalLink
          class="blue dim"
          item={{
            name: "Ranjani's loves",
            link: require('../images/loves.png'),
          }}
          modal
        >
          a handy diagram.
        </ModalLink>
      </Fragment>,
    ],
  },
}
