<template>
<pre class="codeblock"><code>
&lt;a @click=&quot;youClicked = !youClicked&quot; class=&quot;bg-white p-2 rounded-md shadow-md flex items-center cursor-pointer group hover:bg-ynwa&quot;&gt; 
    &lt;div class=&quot;rounded-full overflow-hidden&quot;&gt; 
        &lt;img  
            src=&quot;/abeluzbekistancropped.jpeg&quot;  
            alt=&quot;abel&quot; 
            height=&quot;48&quot; width=&quot;48&quot; 
            loading=&quot;lazy&quot; 
            class=&quot;h-10 w-10 sm:h-12 sm:w-12 hover:scale-105 duration-300&quot;  
        &gt; 
    &lt;/div&gt; 

    &lt;div class=&quot;flex-col ml-3 sm:ml-4&quot;&gt; 
        &lt;h4 class=&quot;text-sm font-semibold group-hover:text-white&quot;&gt;  
            abel 
        &lt;/h4&gt; 

        &lt;div class=&quot;text-xs sm:text-sm italic font-light group-hover:text-white&quot;&gt;  
            That's me holding about $20 worth of foreign money. 
        &lt;/div&gt;  
        &lt;div v-show=&quot;youClicked&quot; class=&quot;text-xs sm:text-sm italic font-light group-hover:text-white&quot;&gt;  
            Probably the only time in my life I'll ever have a bag full of cash.  
        &lt;/div&gt;  
    &lt;/div&gt; 
&lt;/a&gt;  

&lt;script&gt;  
import { ref } from 'vue'  

const youClicked = ref(false) 
&lt;/script&gt;
</code></pre>
</template>