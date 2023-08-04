const Footer = () => {
    return (
        <footer class="site-footer with-footer-cta with-footer-bg">
            <div class="footer-content-area">
                <div class="container">
                    <div class="footer-widgets">
                        <div class="row justify-content-between">
                            <div class="col-xl-3 col-lg-4 col-md-6">
                                <div class="widget about-widget">
                                    <div class="footer-logo">
                                        <h3 style={{ color: "white" }}>Новостной портал</h3>
                                    </div>
                                    <p>
                                        События, Новости, Комментарии
                                    </p>
                                    <div class="newsletter-form">
                                        <h5 class="form-title">Присоединяйся</h5>
                                        <form action="#">
                                            <input type="text" placeholder="Email" />
                                            <button type="submit"><i class="far fa-arrow-right"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-auto col-md-5 col-sm-8">
                                <div class="widget contact-widget">
                                    <h4 class="widget-title">Контакты</h4>
                                    <ul class="info-list">
                                        <li>
                                            <span class="icon"><i class="far fa-phone"></i></span>
                                            <span class="info">
                                                <span class="info-title">Телефон</span>
                                                <a href="#">+375(33)904-70-49</a>
                                            </span>
                                        </li>
                                        <li>
                                            <span class="icon"><i class="far fa-envelope-open"></i></span>
                                            <span class="info">
                                                <span class="info-title">Email</span>
                                                <a href="#">kovaal@gmail.com</a>
                                            </span>
                                        </li>
                                        <li>
                                            <span class="icon"><i class="far fa-map-marker-alt"></i></span>
                                            <span class="info">
                                                <span class="info-title">Местонахождение</span>
                                                <a href="#"> ул.Гагарина 41А, Витебск, Беларусь</a>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="copyright-area">
                        <div class="row flex-md-row-reverse">
                            <div class="col-md-6">
                                <ul class="social-icons">
                                    <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                                    <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <p class="copyright-text">© 2023 <a href="#">Новостной портал</a>. Все права защищены</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
