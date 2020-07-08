package consiliumora.controller

import consiliumora.security.user.UserPrincipal
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class MainController {
    @GetMapping("/")
    fun getMain(@AuthenticationPrincipal user: UserPrincipal?) :String {
        //return mainService.getMain(oAuth2User)

        return if(user == null) {
            "Null"
        } else {
            val greeting = "Hello my name is ${user.username}, my id is ${user.name}, my password is ${user.password}, my role is ${user.authorities.toString()}"
            greeting

        }
    }
}