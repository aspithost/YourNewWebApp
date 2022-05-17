<template>
    <div>
        <div class="grid grid-cols-11  
            2xl:w-[980px] 2xl:m-auto 2xl:grid-cols-7"
        >
            <ul class="flex justify-between px-4 py-2 lg:px-0
                col-start-1 col-end-12 md:col-start-6
                lg:col-end-11 xl:col-end-10 2xl:col-start-5 2xl:col-end-8"
            >
                <li>
                    <router-link class="hover:opacity-50" :to="{ name: 'Featured' }">
                        Featured
                    </router-link>
                </li>
                <li>
                    <router-link class="hover:opacity-50" :to="{ name: 'ScheduledBlogs' }">
                        Pipeline
                    </router-link>
                </li>
                <li>
                    <router-link class="hover:opacity-50" :to="{ name: 'SavedBlogs' }">
                        Saved Blogs
                    </router-link>
                </li>
                <li>
                    <router-link class="hover:opacity-50" :to="{ name: 'EditBlog' }">
                        New Blog
                    </router-link>
                </li>            
            </ul>
        </div>
    </div>
</template>