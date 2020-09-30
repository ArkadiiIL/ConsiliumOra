package consiliumora.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
class UserNotFoundException: RuntimeException {
    constructor(msg: String): super(msg)
    constructor(msg: String, t: Throwable): super(msg,t)
}