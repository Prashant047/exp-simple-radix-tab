import * as Tabs from '@radix-ui/react-tabs';
import { 
  ArrowLeftIcon, ArrowRightIcon,
  StarIcon, ExternalLinkIcon, CheckIcon, LightningBoltIcon 
} from '@radix-ui/react-icons';
import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
 
const tabList = ['t1', 't2', 't3'];
 
export default function App() {

  const [activeTab, setActiveTab] = useState('t1');

  const goNext = () => {
    let currentIndex = tabList.findIndex( tab => tab === activeTab)
    let nextTab = tabList[(currentIndex+1)%3];
    setActiveTab(nextTab);
  }

  const goPrev = () => {
    let currentIndex = tabList.findIndex( tab => tab === activeTab)
    let nextTab = '';
    if (currentIndex-1 < 0){
      nextTab = tabList[2];
    }
    else{
      nextTab = tabList[(currentIndex-1)%3];
    }

    setActiveTab(nextTab);

  }

  return (
    <section className='max-w-md px-2 mx-auto my-4'>
      <div>
        <Tabs.Root className='border rounded-md overflow-hidden' value={activeTab} onValueChange={(t) => setActiveTab(t)}>
          <Tabs.List className='bg-slate-900 flex border-b border-slate-500 p-4 items-center justify-center'>
            <div className='flex bg-slate-800 p-1 py-2 rounded-sm'>
              <TabsTrigger value='t1' activeTab={activeTab}>Issue Detail </TabsTrigger>
              <TabsTrigger value='t2' activeTab={activeTab}>Comments</TabsTrigger>
              <TabsTrigger value='t3' activeTab={activeTab}>Attachment</TabsTrigger>
            </div>
          </Tabs.List>
          <Tabs.Content value='t1'>
            <ContentIssue title="Issue" goNext={goNext} goPrev={goPrev} />
          </Tabs.Content>
          <Tabs.Content value='t2'>
            <ContentIssue title="Comment" goNext={goNext} goPrev={goPrev} />
          </Tabs.Content>
          <Tabs.Content value='t3'>
            <ContentIssue title="Attachment" goNext={goNext} goPrev={goPrev} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </section>
  )
}

function ContentIssue({ title, goNext, goPrev }: {title: string, goNext: () => void, goPrev: () => void}){
  return (
    <article className='px-4 py-6 bg-slate-700 text-slate-50'>
      <div className='flex justify-between items-center'>
        <h3 className='flont-semibold text-lg'>Correct CLS caused by {title}</h3>
        <span className='flex '>
          <button onClick={() => goPrev()} className='flex bg-slate-800 p-1 items-center justify-center rounded-sm hover:bg-slate-800/70 mx-0.5'>
            <ArrowLeftIcon/>
          </button>
          <button onClick={() => goNext()} className='flex bg-slate-800 p-1 items-center justify-center rounded-sm hover:bg-slate-800/70 mx-0.5'>
            <ArrowRightIcon/>
          </button>
        </span>
      </div>
      <ul className='flex mt-4 text-slate-300 text-sm'>
        <li className='mr-2'>
          <CheckIcon/>
        </li>
        <li className='mr-2'>
          <StarIcon/>
        </li>
        <li className='mr-2'>
          <LightningBoltIcon/>
        </li>
        <li className='mr-2'>
          <ExternalLinkIcon/>
        </li>
      </ul>
      <ul className='flex mt-4'>
        <li className='bg-slate-800 hover:bg-slate-800/70 hover:cursor-pointer text-xs text-slate-300 px-3 mr-2 py-1 rounded-sm'>Rates</li>
        <li className='bg-slate-800 hover:bg-slate-800/70 hover:cursor-pointer  text-xs text-slate-300 px-3 mr-2 py-1 rounded-sm'>Sentiment</li>
        <li className='bg-slate-800 hover:bg-slate-800/70 hover:cursor-pointer  text-xs text-slate-300 px-3 mr-2 py-1 rounded-sm'>Tabs</li>
      </ul>
      
      <p className='text-xs mt-6'>Show more</p>
      <p className='text-xs mt-4 text-slate-300'>
        In order to positively influence organic traffic via low CLS score, I want to correct the CLS caused by tabs placed on MDPs
      </p>
    </article>
  )
}

function TabsTrigger({ children, value, activeTab}: { children: ReactNode, value: string, activeTab: string}){
  return (
    <Tabs.Trigger
      className={
        `transition relative flex items-center justify-center text-slate-200 hover:text-slate-400 data-[state=active]:text-slate-100
        px-6 py-1 mx-0.5 text-sm rounded-sm
        `
      }
      value={value}
    >
      {activeTab === value && (
        <motion.div 
          layoutId='active-box'
          className='absolute inset-0 bg-slate-600 rounded-sm'
          transition={{ type: "spring", duration: 0.4}}
        />
      )}
      <motion.span whileTap={{scale:0.98}} className='z-10 relative'>{children}</motion.span>
    </Tabs.Trigger>
  )
}