package com.example.demo

import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

/**
 * @author Chris Georgoulis on 2/1/2019.
 */
@RestController
@RequestMapping("/api/todos", produces = [MediaType.APPLICATION_JSON_VALUE])
class TodoController(
    private val todoRepository: TodoRepository
) {


    @GetMapping("/{id}")
    fun getOne(@PathVariable("id") id: String) =
        todoRepository.findByTodoId(id)?.let { ResponseEntity.ok(it) }
            ?: run { RuntimeException() }

    @GetMapping
    fun getAll() = todoRepository.findAll().let { ResponseEntity.ok(it) }

    @PostMapping
    fun create(@RequestBody todo: Todo) =
        todoRepository.save(todo).let { ResponseEntity.ok(it) }

    @PutMapping("/{id}")
    fun edit(@PathVariable("id") id: String, @RequestBody todo: Todo) =
        todoRepository.save(todo.copy(_id = id))

    @DeleteMapping("/{id}")
    fun delete(@PathVariable("id") id: String) =
        todoRepository.findByTodoId(id)?.let { todoRepository.delete(it) }
}