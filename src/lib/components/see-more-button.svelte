<script lang="ts">
    import rightArrow from '../assets/arrow_right_alt.svg';
</script>
<button on:click>
    <div class="flex gap-2 w-fit bg-snow rounded-lg py-3 px-6 items-center justify-center border-raisin border-2 text-raisin shadow-sm">
        <div>Read More</div>
        <img src={rightArrow} alt="arrow">
    </div>
</button>