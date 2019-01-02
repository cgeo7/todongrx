package com.example.demo

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

/**
 * @author Chris Georgoulis on 2/1/2019.
 */
interface TodoRepository : JpaRepository<Todo, String> {

    @Query("select t from Todo t where t._id = ?1")
    fun findByTodoId(id: String) : Todo?
}
