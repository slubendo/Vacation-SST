import '../App.css'
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";


export interface postProps {
	id:number
	userId: string
	title: string
	description: string
	url: string
	createdAt: string
	numLikes: number
  }

  function Post({ post }: { post: postProps }) {
	  const { getToken, user } = useKindeAuth();

	async function deletePost() {

		const token = await getToken();
		if (!token) {
		  throw new Error("No token found");
		}
		const res = await fetch(import.meta.env.VITE_APP_API_URL + "/posts", {
			method: 'DELETE',
			body: JSON.stringify({ postId: post.id }),
			headers: {
				Authorization: token,
			  },  	
		});
		const data = await res.json()
		console.log(data)
		window.location.reload()
	}

	async function likePost() {

		const token = await getToken();
		if (!token) {
		  throw new Error("No token found");
		}
		const res = await fetch(import.meta.env.VITE_APP_API_URL + "/likes", {
			method: 'POST',
			body: JSON.stringify({ userId: user?.id, postId: post.id }),
			headers: {
				Authorization: token,
			  },  	
		});
		const data = await res.json()
		console.log(data)
		window.location.reload()
	}

  return (
    <div className="flex flex-col justify-center mt-10">
	<div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
		<div className="w-full md:w-1/3 bg-white grid place-items-center">
			<img src={post.url} alt="Vacation picture" width="600" className="rounded-xl" />
    	</div>
		<div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
			<div className="flex justify-between item-center">
				<p className="text-gray-500 font-medium hidden md:block">Vacations</p>

				<div className="flex">

					<button>
						<svg xmlns="http://www.w3.org/2000/svg" onClick={likePost} className="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
								clip-rule="evenodd" />
						</svg>
					</button>
					<p>{post.numLikes}</p>
					<button>
						<svg xmlns="http://www.w3.org/2000/svg" onClick={deletePost} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-2 w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
						</svg>
					</button>
				</div>
			</div>
			<h3 className="font-black text-gray-800 md:text-3xl text-xl">{post.title}</h3>
			<p className="md:text-lg text-gray-500 text-base">{post.description}</p>
		</div>
	</div>
	</div>
  );
}

export default Post