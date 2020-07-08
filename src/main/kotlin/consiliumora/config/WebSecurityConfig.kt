package consiliumora.config

import consiliumora.security.CustomTokenResponseConverter
import consiliumora.service.CustomOAuth2UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.FormHttpMessageConverter
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest
import org.springframework.security.oauth2.client.http.OAuth2ErrorResponseErrorHandler
import org.springframework.security.oauth2.core.http.converter.OAuth2AccessTokenResponseHttpMessageConverter
import org.springframework.web.client.RestTemplate



@Configuration
class WebSecurityConfig(@Autowired val customOAuth2UserService: CustomOAuth2UserService) : WebSecurityConfigurerAdapter() {
    override fun configure(http: HttpSecurity?) {
        http?.authorizeRequests()
            ?.antMatchers("/error**", "/js/**", "login/*", "/")?.permitAll()
            ?.anyRequest()?.authenticated()
            ?.and()
            ?.oauth2Login()
            ?.userInfoEndpoint()
            ?.userService(customOAuth2UserService)

        http?.oauth2Login()?.tokenEndpoint()?.accessTokenResponseClient(accessTokenResponseClient())
    }

    @Bean
    fun accessTokenResponseClient(): OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest?>? {
        val accessTokenResponseClient =
            DefaultAuthorizationCodeTokenResponseClient()
        val tokenResponseHttpMessageConverter =
            OAuth2AccessTokenResponseHttpMessageConverter()
        tokenResponseHttpMessageConverter.setTokenResponseConverter(CustomTokenResponseConverter())
        val restTemplate = RestTemplate(
            listOf(
                FormHttpMessageConverter(), tokenResponseHttpMessageConverter
            )
        )
        restTemplate.errorHandler = OAuth2ErrorResponseErrorHandler()
        accessTokenResponseClient.setRestOperations(restTemplate)
        return accessTokenResponseClient
    }


}