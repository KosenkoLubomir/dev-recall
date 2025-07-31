import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function useCopyDefaultPages() {
    const supabase = createClientComponentClient();

    const copyDefaultPagesToUser = async (stackItemId: string, userId: string) => {
        // 1. Fetch default pages
        const { data: defaultPages, error } = await supabase
            .from('default_pages')
            .select('*')
            .eq('stack_item_id', stackItemId);

        if (error) {
            console.error('Error fetching default pages:', error.message);
            return;
        }

        if (!defaultPages || defaultPages.length === 0) {
            console.info(`No default pages found for stackItemId: ${stackItemId}`);
            return;
        }

        // 2. Find folder ID for this user + stackItem
        const { data: folders, error: folderError } = await supabase
            .from('folders')
            .select('id')
            .eq('user_id', userId)
            .eq('stack_item_id', stackItemId)
            .limit(1)
            .single();

        if (folderError || !folders) {
            console.error('Folder not found for this user and stack item:', folderError?.message);
            return;
        }

        // 3. Prepare page insert
        const userPages = defaultPages.map((page) => ({
            title: page.name,
            content: page.content,
            user_id: userId,
            folder_id: folders.id,
        }));

        // 4. Insert
        const { error: insertError } = await supabase.from('pages').insert(userPages);
        if (insertError) {
            console.error('Error inserting user pages:', insertError.message);
        }
    };

    return { copyDefaultPagesToUser };
}