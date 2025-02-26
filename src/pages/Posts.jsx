import React, { useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import { getPagesCount } from '../utils/pages';
import { usePosts } from '../hooks/usePosts';
import { MyButton } from '../components/UI/button/MyButton';
import { MyModal } from '../components/UI/modal/MyModal';
import { PostForm } from '../components/PostForm';
import { PostFilter } from '../components/PostFilter';
import { MyLoader } from '../components/UI/loader/MyLoader';
import { PostList } from '../components/PostList';
import { Pagination } from '../components/UI/pagination/Pagination';
import { MySelect } from '../components/UI/select/MySelect';


function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const sortedAndSearchedPosts= usePosts(posts, filter.sort, filter.query)

  const createNewPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyButton 
        style={{marginTop: 30}} 
        onClick={() => setModal(true)}>
            Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createNewPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect 
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Количество постов на странице"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Показать все'}
        ]} 
      />
      {postError && <h1>Произошла ошибка {postError}</h1>}
      {isPostLoading ? <MyLoader /> 
      : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>}
      <Pagination 
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default Posts;