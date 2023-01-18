import React from 'react'
import './Footer.css'
import {NavLink} from "react-router-dom"

const Footer = () => {
  return (
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">
                Isso é um projeto pessoal para criação de um portfólio.
            </p>
            <NavLink to='/login'>Login</NavLink>
            <br />
            <NavLink to='/create/user'>Criar Conta</NavLink>
          </div>

          <div class="col-xs-6 col-md-6">
            <h6>Feito com</h6>
            <ul class="footer-links">
              <li>ReactJs</li>
              <li>NodeJs</li>
              <li>Bootstrap</li>
              <li>MongoDB</li>
              <li>Express</li>
             
            </ul>
          </div>

         
        </div>
        <hr />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2017 All Rights Reserved by 
         <a href="#">Vlad Sidorov</a>.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="https://twitter.com/VladSidorov77"><i class="fa fa-twitter"></i></a></li>
              <li><a class="github" href="https://github.com/Senhor-T"><i class="fa fa-github" aria-hidden="true"></i></a></li>
              <li><a class="linkedin" href="https://www.linkedin.com/in/vitor-vieira-mendes-712308232/"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
  )
}

export default Footer