using System;

namespace QuestVo.Models
{
    public class Entry
    {
        public Guid EntryId { get; set; }
        public Guid UserId { get; set; }
        public string Language { get; set; }
        public string Word { get; set; }
        public string Function { get; set; }
        public string Definition { get; set; }

        public ApplicationUser User { get; set; }
    }
}
