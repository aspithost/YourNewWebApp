<template>
    <div class="bg-white border-gray-200 rounded-md shadow-md mb-2 p-4 lg:pt-6 lg:px-8">
        <h2 class="h2-narrow">
            Sign Up Now!
        </h2>
        <p>
            Want to join the discussion? Sign up for free!
        </p>
        <router-link :to="{ name: 'Join' }">
            <Button 
                label="Register Now!"
                class="my-2"
            />
        </router-link>
        <p>
            Once registered, you'll be able to comment on any of the blogs.
        </p>
        <p class="text-sm">
            <strong>Don't worry</strong>: I will not send you spammy e-mails whatsoever.
        </p>
    </div>
</template>