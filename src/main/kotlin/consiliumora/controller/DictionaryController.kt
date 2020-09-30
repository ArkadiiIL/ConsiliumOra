package consiliumora.controller

import consiliumora.dictionary.DictionaryInfo
import consiliumora.exception.UserNotFoundException
import consiliumora.security.user.UserPrincipal
import consiliumora.service.DictionaryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.lang.Exception
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("dictionary")
class DictionaryController(@Autowired val dictionaryService: DictionaryService) {

    @GetMapping("{id}")
    fun get(@PathVariable id: Long,
            @AuthenticationPrincipal user: UserPrincipal
    ) :DictionaryInfo {
        return dictionaryService.getDictionary(id, user)
    }

    @PostMapping("/new")
    @ResponseBody
    fun create(@RequestBody dictionaryInfo: DictionaryInfo,
               @AuthenticationPrincipal user: UserPrincipal): Long {
            return dictionaryService.create(dictionaryInfo, user.getId())
    }
}