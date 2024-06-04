<script setup>
import { onMounted, ref } from "vue";
import ProfileDetailsSkeleton from "@/components/ui/skeleton/ProfileDetailsSkeleton.vue";
import { Icon } from "@iconify/vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const userProfile = ref([]);
const isLoading = ref(false);

const fetchUserGithubProfile = async () => {
  isLoading.value = true;

  try {
    const response = await fetch(`https://api.github.com/users/Stan015`, {
      headers: {
        Authorization: import.meta.env.VITE_REACT_APP_GITHUB_TOKEN
          ? `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`
          : undefined,
      },
    });

    if (!response) {
      throw new Error("failed to fetch user github profile");
    }

    const data = await response.json();

    userProfile.value = data;

    // console.log(userProfile.value)
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
  }
};

const handleEmailClick = () => {
  window.location.href = `mailto:${userProfile.value.email}`;
};

onMounted(() => {
  fetchUserGithubProfile();
});
</script>

<template>
  <ProfileDetailsSkeleton v-if="isLoading" />
  <div v-else class="flex flex-col w-full items-center gap-6 pt-10">
    <Card class="flex flex-col items-center max-md:w-4/5 max-lg:w-3/5 lg:w-3/6">
      <CardHeader class="flex flex-row gap-4 justify-center">
        <div class="">
          <div class="flex gap-4 items-center justify-center mb-2">
            <Avatar class="w-10 h-10">
              <AvatarImage
                v-if="userProfile.avatar_url"
                :src="userProfile.avatar_url"
              />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <CardTitle class="">{{ userProfile.name }}</CardTitle>
          </div>
          <CardDescription class="text-center text-balance">
            {{ userProfile.bio }}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent class="flex gap-4 justify-center">
        <p class="text-center max-sm:text-sm">
          Public Repositories: {{ userProfile.public_repos }}
        </p>
        <p class="text-center max-sm:text-sm">
          Followers: {{ userProfile.followers }}
        </p>
      </CardContent>
      <CardFooter
        class="flex w-full gap-4 items-center justify-center text-center"
      >
        <p
          class="transition-all text-[1.8rem] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm hover:bg-violet-800 cursor-pointer"
          @click="handleEmailClick"
          tabIndex="0"
        >
          <Icon icon="ic:baseline-email" />
        </p>
        <a
          href="https://twitter.com/StanleyAzi"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-all text-[1.3rem] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm hover:bg-violet-800 p-1"
        >
          <Icon icon="prime:twitter" />
        </a>
        <a
          href="https://www.linkedin.com/in/stanley-azi-475044217/"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-all text-[1.7rem] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm hover:bg-violet-800 p-[1px]"
        >
          <Icon icon="ri:linkedin-fill" />
        </a>
      </CardFooter>
    </Card>
  </div>
</template>
