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
    content: [
      <Fragment key={0}>
        Hi! I&apos;m Ranjani, a Brooklyn-based video journalist. I&apos;m
        currently a senior producer at Vox, where my work focuses largely on
        history, racial justice, and inequality — and how they all intersect. I
        host and produce a series called{' '}
        <a
          href="https://www.youtube.com/playlist?list=PLJ8cMiYb3G5fR2kt0L4Nihvel4pEDw9od"
          target="_blank"
          rel="noopener noreferrer"
          class="blue dim"
        >
          Missing Chapter
        </a>
        , where we we set the record straight on stories that are often
        overlooked or distorted in history textbooks.
      </Fragment>,
      <Fragment key={1}>
        Previously, I was the first ever Vox-ProPublica fellow, where I worked
        in both newsrooms to create videos that combined Vox&apos;s visual style
        with ProPublica&apos;s deep investigative reporting. I have also
        produced with independent documentary companies, National Geographic, Al
        Jazeera America, and NBC News.
      </Fragment>,
      <Fragment key={2}>
        I&apos;m a Houston native, I come from a mixed Bengali and Telugu
        family, and will always say yes to karaoke. Want to say hi? Contact me
        using whichever is your favorite method from the icons below.
      </Fragment>,
    ],
  },
}
