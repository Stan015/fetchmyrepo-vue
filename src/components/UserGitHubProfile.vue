<script setup>
import { reactive } from 'vue';
import { Icon } from '@iconify/vue';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const userProfile = reactive({
  avatar_url: ''
})
</script>

<template>
  <div className="flex flex-col w-full items-center gap-6 pt-10">
      <Card className="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6">
        <CardHeader className="flex flex-row gap-4 justify-center ">
          <div className="">
            <div className="flex gap-4 items-center justify-center mb-2">
              <Avatar className="">
                <AvatarImage :src='userProfile.avatar_url' />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <CardTitle className="">{userProfile.name}</CardTitle>
            </div>
            <CardDescription className="text-center text-balance">
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex gap-4 justify-center">
          <p className="text-center max-sm:text-sm">
            Public Repositories: 
          </p>
          <p className="text-center max-sm:text-sm">
            Followers: 
          </p>
        </CardContent>
        <CardFooter className="flex w-full gap-4 items-center justify-center text-center">
          <p
            className="transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1  rounded-sm hover:bg-violet-800"
            @click='() => {
              window.location.href = `mailto:${userProfile.email}`;
            }'
            tabIndex="0"
          >
            <Icon icon="ic:baseline-email" />
          </p>
          <a
            href="https://twitter.com/StanleyAzi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm hover:bg-violet-800 p-1"
          >
            <Icon icon="prime:twitter" />
          </a>
          <a
            href="https://www.linkedin.com/in/stanley-azi-475044217/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  rounded-sm hover:bg-violet-800 p-[1px]"
          >
            <Icon icon="ri:linkedin-fill" />
          </a>
        </CardFooter>
      </Card>
    </div>
</template>


