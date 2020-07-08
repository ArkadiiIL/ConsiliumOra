package consiliumora.security

import org.springframework.core.convert.converter.Converter
import org.springframework.security.oauth2.core.OAuth2AccessToken
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames

class CustomTokenResponseConverter: Converter<Map<String, String>, OAuth2AccessTokenResponse> {
    override fun convert(source: Map<String, String>): OAuth2AccessTokenResponse? {
        val accessToken = source[OAuth2ParameterNames.ACCESS_TOKEN]
        val accessTokenType = OAuth2AccessToken.TokenType.BEARER
        val additionalParameters = HashMap<String, Any>()
        source.forEach { (key, value) ->
            additionalParameters[key] = value
        }
        return if(source[OAuth2ParameterNames.EXPIRES_IN] == null) {
            OAuth2AccessTokenResponse.withToken(accessToken)
                .tokenType(accessTokenType)
                .additionalParameters(additionalParameters)
                .build()
        } else {
            OAuth2AccessTokenResponse.withToken(accessToken)
                .tokenType(accessTokenType)
                .expiresIn(source[OAuth2ParameterNames.EXPIRES_IN]!!.toLong())
                .additionalParameters(additionalParameters)
                .build()
        }

    }

}