import React, { useState, useRef } from 'react';

import Tab from './tab'

function Tabs({tabs, updateTabs, addNewTab, activeTab, setActiveTab}) {
  
  const [, setTabTitle] = useState(tabs[activeTab].title)
  const [, setTabText] = useState(tabs[activeTab].text)
  const navRef = useRef(null)

  function saveText(str = tabs[activeTab.text]) {
    const tab = tabs[activeTab]
    const newTab = Object.assign(tab, {text: str})
    tabs[activeTab] = newTab
    setTabText(str)
    updateTabs(tabs)
  }

  function onChangeText(e) {
    const text = e.target.value
    saveText(text)
  }

  function saveTitle(str = tabs[activeTab.title]) {
    setTabTitle(str)
    const tab = tabs[activeTab]
    const newTab = Object.assign(tab, {title: str})
    tabs[activeTab] = newTab
    updateTabs(tabs)
  }

  function clearTab() {
    saveTitle('new')
    saveText('')
  }

  function setTab(idx) {
    setActiveTab(idx)
    const newTitle = tabs[idx].title
    const newText = tabs[idx].text
    setTabTitle(newTitle)
    setTabText(newText)
    document.getElementById('text').value = newText
  }

  function deleteTab(idx) {
    if (tabs.length === 1) {
      clearTab()
      return
    }
    const newTabState = [...tabs]
    newTabState.splice(idx, 1)
    updateTabs(newTabState)
  }

  function showTabs() {
    return (
      tabs.map((tab,idx) => {
        return (
          <Tab 
            key={'tab-' + idx}
            tab={tab} 
            idx={idx} 
            activeTab={activeTab}
            setTab={setTab}
            deleteTab={deleteTab}
            saveTitle={saveTitle}
          />
        )
      })
    )
  }

  function onWheel(e) {
    e.preventDefault();
    let scrollPosition = navRef.current.scrollLeft;
    if (e.deltaX === 0) {
      navRef.current.scrollTo({
        top: 0,
        left: scrollPosition + e.deltaY
      })
    }
  }

  return (
    <div className = "App" >
      <nav className='nav' ref={navRef} onWheel={onWheel}>
        {showTabs()}

        <button className='tab new-tab' onClick={addNewTab}>+</button>
      </nav>
      <div className='body'>
        <textarea id='text' onChange={onChangeText} wrap='soft' value={tabs[activeTab].text}></textarea>
      </div>

      <footer className="credit">
        Made with love by <a href="https://github.com/FueRobertHer" rel='noopener noreferrer' target="_blank">Fue Her</a>
      </footer>
    </div>
  )
};

export default Tabs