package consiliumora.controller

import consiliumora.exception.EmailTakenException
import consiliumora.security.user.UserInfo
import consiliumora.security.user.UnknownUserPrincipal
import consiliumora.security.user.UserPrincipal
import consiliumora.service.UserRegistrationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletResponse

@RestController
class UserController(@Autowired val userRegistrationService: UserRegistrationService) {
    @GetMapping("/user")
    fun getUser(@AuthenticationPrincipal user: UserPrincipal?) : Any
    {
        return user ?: UnknownUserPrincipal()
    }

    @PostMapping("/user")
    fun registration(@RequestBody userInfo: UserInfo, response: HttpServletResponse) {
        val email = ("^(([^<>()\\[\\]\\.,;:\\s@\\\"]+" +
                "(\\.[^<>()\\[\\]\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))" +
                "@(([^<>()\\[\\]\\.,;:\\s@\\\"]+\\.)+" +
                "[^<>()\\[\\]\\.,;:\\s@\\\"]{2,})$").toRegex()
        if(userInfo.firstName == "" || userInfo.firstName.length > 10) {
            response.status = 400
            response.sendError(400, "firstName data is not correct")
        } else if(userInfo.lastName == "" || userInfo.lastName.length > 10) {
            response.status = 400
            response.sendError(400, "lastName data is not correct")
        } else if(userInfo.email == "" || userInfo.email.length > 30 ||
                !userInfo.email.matches(email)) {
            response.status = 400
            response.sendError(400, "email data is not correct")
        } else if(userInfo.password == "" || userInfo.password.length > 30) {
            response.status = 400
            response.sendError(400, "password data is not correct")
        } else {
            try {
                userRegistrationService.registration(userInfo)
            } catch (e: EmailTakenException) {
                response.status = 409
                response.sendError(409, "Email already taken")
            }

        }

    }
}