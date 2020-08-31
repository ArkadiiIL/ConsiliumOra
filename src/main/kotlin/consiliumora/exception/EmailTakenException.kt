package consiliumora.exception

import org.springframework.security.core.AuthenticationException

class EmailTakenException: AuthenticationException {
    constructor(msg: String): super(msg)
    constructor(msg: String, t: Throwable): super(msg,t)
}