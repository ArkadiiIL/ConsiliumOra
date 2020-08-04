package consiliumora.controller

import consiliumora.security.user.UnknownUserPrincipal
import consiliumora.security.user.UserPrincipal
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController {
    @GetMapping("/user")
    fun getUser(@AuthenticationPrincipal user: UserPrincipal?) : Any
    {
        return user ?: UnknownUserPrincipal()
    }
}