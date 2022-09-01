import React, {useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import MoveHome from "../routeBtn/MoveHome";
import MoveClip from '../routeBtn/MoveClip';


<FontAwesomeIcon icon={faBars} />


export default function Header() {
  const [visible, setVisible] =  useState(false)

  function click (){
    setVisible(prev => !prev)
  }
return (

  <header class="bg-gray-50 flex items-center ">
  <div class="px-4 py-8 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
    <div>

      {/* 메뉴들 들어가 있는 바를 감싸고 있는  div  */}
      <div class="flex items-center justify-between flex-1 gap-8 sm:justify-end">
        {/* 오른쪽에 고정 */}
        <div class="absolute top-5 right-10 flex gap-4">


        {/* 다크 모드 적용하는 버튼을 만들어 보고 싶당 */} 
          <a class="block p-2.5 text-gray-600 bg-white rounded-lg hover:text-gray-700 shrink-0 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </a>
        
          {/* <>
      <FontAwesomeIcon icon={faBars} onClick={click} 
      class="flex flex-col px-3 py-2 border rounded border-gray-500 hover:text-white hover:border-purple"/>
      {visible ? (
        <nav>
         <div>  <MoveHome/> </div> 
         <div>  <MoveClip/> </div> 
        </nav>
      ): null }
      </> */}

{/* ---------------추가한 버튼부분------------------- */}

<div class="relative inline-block text-left">
  <div>
    <button type="button" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-sky-500/50 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
      <FontAwesomeIcon icon={faBars} onClick={click} class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </FontAwesomeIcon>
    </button>
  </div>

  <div class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    
    {/*아니 여기 아래에 shadow같은게 먹혀있나??? 왜 긴 줄같은게 뜨지 <div class="py-1"> */}    <div>
      {visible ? (
      <nav>
      <a class="text-gray-700 hover:text-sky-400 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1"><MoveHome/></a>
      <a class="text-gray-700 hover:text-sky-400 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1"><MoveClip/></a>
      </nav>
      ): null }
    </div>
  </div>

</div>

{/* ---------------------------- */}
        </div>
      </div>
    </div>

    <div class="mt-8" >
      <h1 class="text-5xl font-bold text-gray-900 sm:text-5xl font-headerFont">
        The Handmade Times
      </h1>
    </div>
    


<div class="flex justify-center">
  <div class="mb-3 xl:w-96 pt-8">
    <input
      type="search"
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      placeholder="Type to search ..."
    />
  </div>
</div>


  </div>
</header>


)}
