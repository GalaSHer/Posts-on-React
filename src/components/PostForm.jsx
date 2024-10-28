import React, { useState } from "react";
import { MyInput } from "./UI/input/MyInput";
import { MyButton } from "./UI/button/MyButton";

export const PostForm = ({create}) => {
  const [post, setPost] = useState({
    title: '',
    body: ''
  })

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post, id: Date.now()
    }
    create(newPost);
    setPost({title: '', body: ''})
  }

  return (
    <form>
        <MyInput 
          value={post.title} 
          type='text' 
          placeholder='Название поста' 
          onChange={e => setPost({...post, title: e.target.value})}/>
        <MyInput 
          value={post.body} 
          type='text' 
          placeholder='Описание поста'
          onChange={e => setPost({...post, body: e.target.value})} />
        <MyButton type='submit' onClick={addNewPost}>Создать пост</MyButton>
      </form>
  )
}