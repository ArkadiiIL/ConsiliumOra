import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
plugins {
    id("org.jetbrains.kotlin.jvm") version "1.3.70"
    application
    id("org.springframework.boot") version "2.2.2.RELEASE"
    id("io.spring.dependency-management") version "1.0.8.RELEASE"
    kotlin("plugin.jpa") version "1.3.72"
    kotlin("plugin.spring") version "1.3.72"
}

repositories {
    jcenter()
    mavenCentral()
}

dependencies {
    implementation(platform("org.jetbrains.kotlin:kotlin-bom"))
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    testImplementation("org.jetbrains.kotlin:kotlin-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")

    implementation("org.springframework.boot:spring-boot-starter-web:2.3.1.RELEASE")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:2.3.1.RELEASE")
    implementation("javax.xml.bind:jaxb-api:2.2.4")
    implementation("org.springframework.boot:spring-boot-starter-security:2.3.0.RELEASE")
    implementation("org.springframework.security:spring-security-oauth2-client:5.3.3.RELEASE")
    implementation("org.springframework.security:spring-security-oauth2-jose:5.3.3.RELEASE")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf:2.3.0.RELEASE")

    implementation("org.postgresql:postgresql")

}

application {
    mainClassName = "WillMeet.AppKt"
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}
