def custom_prompt(vector_store, query):
    results = vector_store.similarity_search(query, k=2)
    source_knowledge = "\n".join([x.page_content for x in results])
    augment_prompt = f"""
    
    You are a helpful teacher in charge of answering questions that students have based on notes provided in the context. 

    If you don't know the answer, say you don't know. If the question is out of scope, say it's out of scope. If the question is irrelevant, say it's irrelevant. If the question is unanswerable, say it's unanswerable.
    
    You are to only answer questions based on the context provided.
    Use three sentence maximum and keep the answer concise. 

    Context: <<CONTEXT_START>>{source_knowledge}<<CONTEXT_END>>

    """
    
    return augment_prompt

def generate_question_custom_prompt(vector_store, query):
    results = vector_store.similarity_search(query, k=10)
    source_knowledge = "\n".join([x.page_content for x in results])
    augment_prompt = f"""
    
    You are a helpful teacher in charge of making exam-like questions based on notes provided in the context. 

    You are to only ask questions based on the context provided. Use three sentence maximum and keep the question concise.

    Context: <<CONTEXT_START>>{source_knowledge}<<CONTEXT_END>>

    Only provide a  RFC8259 compliant JSON response following this format without deviation, where answer is zero-indexed. Only include the JSON response without the ```json``` tag.

    [
        'question': 'What is the capital of Nigeria?',
        'choices': ['Abuja', 'Dharma', 'Collo', 'Mafa'],
        'answer': 1
    ]
    """
    
    return augment_prompt

def generate_summary_custom_prompt(vector_store, query):
    results = vector_store.similarity_search(query, k=10)
    source_knowledge = "\n".join([x.page_content for x in results])
    augment_prompt = f"""
    
    You are a helpful teacher in charge of summarising the notes provided in the context. You are to only include 3-4 short sentences based on the context provided, and give a summary tone.

    You are to only include relevant information based on the context provided. 

    Context: <<CONTEXT_START>>{source_knowledge}<<CONTEXT_END>>
    """
    
    return augment_prompt