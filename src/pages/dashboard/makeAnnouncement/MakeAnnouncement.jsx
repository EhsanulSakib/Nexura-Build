import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";

const MakeAnnouncement = () => {
    const axiosPublic = useAxiosPublic()

    const handleAnnouncement = event => {
        event.preventDefault()

        const form = event.target

        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');

        const post_title = form.post_title.value
        const description = form.description.value
        const post_date = `${year}-${month}-${day}`
        const announcement = { post_date, post_title, description }

        console.log(announcement)

        axiosPublic.post('/announcements', announcement)
            .then(res => {
                console.log(res.data)
            })

    }
    return (

        <div>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center my-8'>Make Announcement</h2>
            <form onSubmit={handleAnnouncement} className="p-4 rounded-md w-11/12 border border-gray-400 shadow-sm m-auto mb-8">
                <input type="text" name="post_title" id="" className="w-full p-4 bg-transparent border border-gray-300 rounded-md" placeholder="Write Announcement Title" />

                <textarea name="description" id="" className="p-4 w-full min-h-44 max-h-44 my-4 border border-gray-300 rounded-md bg-transparent" placeholder="Write Announcement Description"></textarea>

                <input type="submit" value="Post" className="btn text-lg btn-info bg-blue-500 font-bold text-white col-span-2 py-2 w-full" />
            </form>
        </div>
    );
};

export default MakeAnnouncement;