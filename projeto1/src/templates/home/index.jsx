import '../../styles/global-styles.css';

import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts'

import { Posts } from '../../components/Posts';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

//import 'bootstrap/dist/css/bootstrap.min.css';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: {},
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts)
    this.setState({ posts, page: nextPage })
  }
  handleChange = (e) => {
   const {value} = e.target;
   this.setState({searchValue: value})
  }

  render() {
    const { posts , page , postsPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts

    const filteredPost = !!searchValue ? 
   posts.filter(posts => {
     return posts.title.toLowerCase().includes(searchValue.toLowerCase());
   })
    : posts;

    return (
      //Começo do elemento pai para criar a página
      <section className='container'>
        <div className='search-container'>
        {!!searchValue && (<h1>Search Value: {searchValue} </h1> )}
        <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>
        <br/><br/><br/>
        {filteredPost.length> 0 && (
          <Posts posts={filteredPost} />
        )}
         {filteredPost.length === 0 && (
          <p>Não existem posts</p>
        )}
        
        <div className='button-container'>
          {!searchValue &&(
            <Button
            disabled = {noMorePosts} 
            text='Load More Props' 
            onClick={this.loadMorePosts}
             />
          )} 
        </div>

      </section>

    )
  }
}


