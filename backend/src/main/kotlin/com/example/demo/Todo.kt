package com.example.demo

import java.time.ZonedDateTime
import java.util.*
import javax.persistence.Entity
import javax.persistence.Id

/**
 * @author Chris Georgoulis on 2/1/2019.
 */
@Entity
data class Todo(
    @Id val _id: String? = UUID.randomUUID().toString(),
    val title: String = "",
    val description: String = "",
    val date: ZonedDateTime = ZonedDateTime.now(),
    val status: String
)

fun foo() {
}
