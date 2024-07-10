import React from 'react'

function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4  fixed bottom-0 ">
      <aside>
        <p>Copyright © ${new Date().getFullYear()} - All right reserved by 
          <a className='pl-1 link text-blue-700  font-semibold' target={'_blank'} href="https://github.com/khojiakbargofurov">
            Khojiakbar Gofurov
          </a>
        </p>
      </aside>
    </footer>)
}

export default Footer