package consiliumora.controller

import consiliumora.security.user.UnknownUserPrincipal
import consiliumora.security.user.UserPrincipal
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class MainController {
    @Value("\${spring.profiles.active:prod}")
    private lateinit var profile: String
    @GetMapping("/")
    fun getMain(@AuthenticationPrincipal user: UserPrincipal?,
    model:Model) :String {
        model.addAttribute("profile", user ?: UnknownUserPrincipal())
        model.addAttribute("isDevMode", "dev" == profile)
        return "index"
    }
}