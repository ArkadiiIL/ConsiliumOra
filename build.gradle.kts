
import com.moowork.gradle.node.yarn.YarnTask
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.jetbrains.kotlin.jvm") version "1.3.70"
    application
    id("org.springframework.boot") version "2.2.2.RELEASE"
    id("io.spring.dependency-management") version "1.0.8.RELEASE"
    kotlin("plugin.jpa") version "1.3.72"
    kotlin("plugin.spring") version "1.3.72"
    id ("com.moowork.node") version "1.3.1"
}

tasks.register<YarnTask>("buildFront") {
    args = listOf("build")
    dependsOn("yarn_install")
}

tasks.named<YarnTask>("yarn_install") {
    dependsOn("yarn_cache_clean")
}

tasks.withType<ProcessResources> {
    dependsOn("buildFront")
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
    implementation("commons-codec:commons-codec:1.14")

    implementation("org.postgresql:postgresql")
}

application {
    mainClassName = "consiliumora.ConsiliumOraApplicationKt"
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}
