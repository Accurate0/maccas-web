<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import { Input } from '$lib/components/ui/input';
  import Label from '$lib/components/ui/label/label.svelte';
  import * as Card from '$lib/components/ui/card';
</script>

<svelte:head>
  <title>Login | Maccas</title>
</svelte:head>

<div class="flex h-screen justify-center items-center">
  <div class="w-full max-w-md container mx-auto">
    <form method="post">
      <Card.Root>
        <Card.Header>
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in</h3>
        </Card.Header>
        <Card.Content class="flex flex-col space-y-6">
          <div class="grid w-full max-w-sm items-center gap-2">
            <Label for="username">Username</Label>
            <Input type="username" name="username" id="username" placeholder="Username" required />
          </div>
          <div class="grid w-full max-w-sm items-center gap-2">
            <Label for="password">Your password</Label>
            <Input type="password" name="password" id="password" placeholder="•••••" required />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button type="submit" class="w-full">Login</Button>
        </Card.Footer>
      </Card.Root>
    </form>
  </div>
</div>
