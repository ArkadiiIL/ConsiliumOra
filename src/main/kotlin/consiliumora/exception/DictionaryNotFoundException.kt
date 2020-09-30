package consiliumora.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus
import java.lang.RuntimeException

@ResponseStatus(HttpStatus.BAD_REQUEST)
class DictionaryNotFoundException: RuntimeException {
    constructor(msg: String): super(msg)
    constructor(msg: String, t: Throwable): super(msg,t)
}