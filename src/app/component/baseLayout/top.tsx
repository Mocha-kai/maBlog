'use client';
import AddReactionIcon from '@mui/icons-material/AddReaction';

const TopLayout = () => {
    return (
        <header className="sticky top-0 flex flex-row ">
            <AddReactionIcon />
            <div className="italic text-3xl">Ma_Blog</div>
        </header>
    );
};

export default TopLayout;
