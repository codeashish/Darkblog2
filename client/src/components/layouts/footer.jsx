import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className=" mt-5 p-4 text-center" style={{ backgroundColor: '#02050A', color: '#03e9f4' }} >
                    Copyright &copy; {new Date().getFullYear()} Darkblog
  </footer>
            </div>
        )
    }
}
