import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const MakeAnnouncement = () => {
    const axiosPublic = useAxiosPublic()
    const route = useNavigate()
    const notify = () => toast.success("Announcement Added Successfully");
    const { darkMode } = useContext(AuthContext)

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
                if (res.data.acknowledged) {
                    form.reset()
                    route('/dashboard/announcements')
                    notify()
                }
            })

    }
    return (
        <div>
            <h2 className='text-xl md:text-xl lg:text-3xl font-bold mt-1 lg:mt-4'>Make Announcement</h2>
            <form onSubmit={handleAnnouncement} className={`${darkMode ? "bg-gray-900 border-gray-700" : "bg-slate-50 border-gray-300"} mt-4 lg:mt-8 p-4 rounded-md w-full shadow-md m-auto mb-8 border`}>
                <input type="text" name="post_title" id="" className={`${darkMode ? "bg-gray-700 border-gray-700" : "bg-slate-100 border-gray-300"} w-full p-4 shadow-sm rounded-md border`} placeholder="Write Announcement Title" />

                <textarea name="description" id="" className={`${darkMode ? "bg-gray-700 border-gray-700" : "bg-slate-100 border-gray-300"} p-4 w-full min-h-44 max-h-44 my-4 rounded-md shadow-sm border`} placeholder="Write Announcement Description"></textarea>

                <input type="submit" value="Post" className="btn text-lg btn-info bg-blue-500 hover:bg-blue-400 border-none font-bold text-white col-span-2 py-2 w-full" />
            </form>
        </div>
    );
};

export default MakeAnnouncement;